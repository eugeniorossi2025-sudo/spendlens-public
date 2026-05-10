import https from "node:https";
import type { ExtractedSource, ResearchFinding, ResearchSource } from "./types";

const MAX_TEXT_CHARS = 50_000;

export async function extractSource(source: ResearchSource): Promise<ExtractedSource> {
  const fetchedAt = new Date().toISOString();

  try {
    const response = await fetch(source.url, {
      headers: {
        "accept": "text/html,application/xhtml+xml,application/xml,text/plain,application/pdf;q=0.8,*/*;q=0.5",
        "user-agent": "SpendLensResearchAgent/0.1 (+public-spending-transparency; non-aggressive)",
      },
      redirect: "follow",
    });

    const contentType = response.headers.get("content-type");
    const isTextLike = isSupportedTextContent(contentType, source.url);
    const body = isTextLike ? await response.text() : "";
    const rawText = normalizeText(stripHtml(body)).slice(0, MAX_TEXT_CHARS);

    return {
      ...source,
      fetchedAt,
      ok: response.ok,
      status: response.status,
      contentType,
      rawText,
      findings: extractFindings(source.url, rawText),
      error: response.ok ? undefined : `HTTP ${response.status}`,
    };
  } catch (error) {
    const fallback = await fetchWithPermissiveTlsForKnownPublicHost(source, fetchedAt, error);
    if (fallback) return fallback;

    return {
      ...source,
      fetchedAt,
      ok: false,
      status: null,
      contentType: null,
      rawText: "",
      findings: [],
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function fetchWithPermissiveTlsForKnownPublicHost(
  source: ResearchSource,
  fetchedAt: string,
  originalError: unknown,
): Promise<ExtractedSource | null> {
  if (!isKnownPublicTlsFallbackHost(source.url)) return null;

  try {
    const response = await fetchTextWithNodeHttps(source.url);
    const rawText = normalizeText(stripHtml(response.body)).slice(0, MAX_TEXT_CHARS);
    return {
      ...source,
      fetchedAt,
      ok: response.status >= 200 && response.status < 300,
      status: response.status,
      contentType: response.contentType,
      rawText,
      findings: extractFindings(source.url, rawText),
      error: response.status >= 200 && response.status < 300
        ? `TLS fallback used for known public host after: ${errorMessage(originalError)}`
        : `HTTP ${response.status}; TLS fallback used after: ${errorMessage(originalError)}`,
    };
  } catch {
    return null;
  }
}

function fetchTextWithNodeHttps(url: string): Promise<{ status: number; contentType: string | null; body: string }> {
  return new Promise((resolve, reject) => {
    https.get(url, {
      rejectUnauthorized: false,
      headers: {
        "accept": "text/html,application/xhtml+xml,application/xml,text/plain,*/*;q=0.5",
        "user-agent": "SpendLensResearchAgent/0.1 (+public-spending-transparency; non-aggressive)",
      },
    }, (response) => {
      let body = "";
      response.setEncoding("utf8");
      response.on("data", (chunk) => {
        body += chunk;
      });
      response.on("end", () => {
        resolve({
          status: response.statusCode ?? 0,
          contentType: String(response.headers["content-type"] ?? "") || null,
          body,
        });
      });
    }).on("error", reject);
  });
}

function isKnownPublicTlsFallbackHost(value: string) {
  try {
    const url = new URL(value);
    return url.hostname.toLowerCase() === "appalti.comune.piacenza.it";
  } catch {
    return false;
  }
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

function extractFindings(sourceUrl: string, rawText: string): ResearchFinding[] {
  const portalRecords = extractPortalAppaltiRecords(sourceUrl, rawText);
  if (isPortalAppaltiSource(sourceUrl)) {
    return dedupeFindings(portalRecords);
  }

  const chunks = splitPotentialListItems(rawText);
  const findings = chunks
    .map((chunk) => buildFinding(sourceUrl, chunk))
    .filter((finding): finding is ResearchFinding => Boolean(finding));

  return dedupeFindings(findings);
}

function extractPortalAppaltiRecords(sourceUrl: string, rawText: string): ResearchFinding[] {
  if (!isPortalAppaltiSource(sourceUrl)) return [];

  const normalized = rawText.replace(/\s+/g, " ").trim();
  const recordRegex = /(?:Riferimento procedura\s*:\s*)?(G\d{4,6})\s+Stato\s*:\s*([\s\S]*?)(?=(?:\s+Riferimento procedura\s*:\s*G\d{4,6}\s+Stato\s*:)|(?:\s+G\d{4,6}\s+Stato\s*:)|$)/gi;
  const findings: ResearchFinding[] = [];

  for (const match of normalized.matchAll(recordRegex)) {
    const procedure = match[1]?.trim() ?? null;
    const record = `${procedure ?? ""} Stato : ${match[2] ?? ""}`.trim();
    if (!procedure || !record.includes("Titolo")) continue;

    const title = cleanTitle(matchOne(record, /Titolo\s*:\s*([\s\S]*?)(?=\s+Tipologia appalto\s*:|\s+CIG\s*:|\s+Data pubblicazione|$)/i) ?? `Procedura ${procedure}`);
    const statusLabel = cleanStatus(matchOne(record, /Stato\s*:\s*([\s\S]*?)(?=\s+Visualizza scheda|\s+Stazione appaltante|\s+Titolo\s*:|$)/i));
    const cig = matchOne(record, /\bCIG\b\s*:\s*([A-Z0-9]{8,12})/i);
    const cup = matchOne(record, /\bCUP\b\s*:\s*([A-Z0-9]{10,20})/i);
    const publicationDate = matchOne(record, /Data pubblicazione(?: esito)?\s*:\s*(\d{1,2}[/-]\d{1,2}[/-]\d{4}|\d{4}-\d{2}-\d{2})/i);
    const deadline = matchOne(record, /\b(?:scadenza|termine offerte|presentazione offerte)\b\s*:\s*(\d{1,2}[/-]\d{1,2}[/-]\d{4}|\d{4}-\d{2}-\d{2})/i);
    const procurementMethod = inferProcurementMethod(`${title} ${record}`);
    const contractor = cleanOptional(matchOne(record, /\b(?:aggiudicatario|affidatario|operatore economico|contraente)\b\s*[:\-]?\s*([A-ZÀ-Ú0-9][^.;,\n]{3,140})/i));
    const budgetPlanned = parseBudget(matchOne(record, /\b(?:importo|valore|base di gara|valore affidamento|valore complessivo)\b[^0-9]{0,50}((?:\d{1,3}(?:[.\s]\d{3})+|\d+)(?:,\d{2})?)\s*(?:EUR|€)?/i));

    findings.push({
      title,
      sourceUrl,
      authority: "Comune di Piacenza",
      location: "Piacenza",
      cig,
      cup,
      contractor,
      budgetPlanned,
      procurementMethod,
      publicationDate,
      deadline,
      statusLabel,
      rawText: record.slice(0, 2500),
      confidence: cig ? "high" : "medium",
    });
  }

  return findings;
}

function isPortalAppaltiSource(sourceUrl: string) {
  return sourceUrl.includes("appalti.comune.piacenza.it");
}

function splitPotentialListItems(rawText: string) {
  const normalized = rawText.replace(/\s+/g, " ").trim();
  if (!normalized) return [];

  const markers = [
    /\b(?=G\d{4,6}\b)/g,
    /\b(?=CIG\s*[:\-]?\s*[A-Z0-9]{8,12})/gi,
    /\b(?=Oggetto\s*[:\-])/gi,
    /\b(?=Procedura\s*[:\-])/gi,
  ];

  const offsets = new Set<number>([0]);
  for (const marker of markers) {
    for (const match of normalized.matchAll(marker)) {
      if (typeof match.index === "number") offsets.add(match.index);
    }
  }

  const sorted = [...offsets].sort((left, right) => left - right);
  const chunks: string[] = [];

  for (let index = 0; index < sorted.length; index++) {
    const start = sorted[index] ?? 0;
    const end = sorted[index + 1] ?? Math.min(normalized.length, start + 2500);
    const chunk = normalized.slice(start, end).trim();
    if (chunk.length >= 80) chunks.push(chunk.slice(0, 2500));
  }

  return chunks.length > 0 ? chunks : [normalized.slice(0, 2500)];
}

function buildFinding(sourceUrl: string, text: string): ResearchFinding | null {
  const cig = matchOne(text, /\bCIG\b\s*[:\-]?\s*([A-Z0-9]{8,12})/i);
  const cup = matchOne(text, /\bCUP\b\s*[:\-]?\s*([A-Z0-9]{10,20})/i);
  const procedure = matchOne(text, /\b(G\d{4,6})\b/i);
  const title = extractTitle(text, procedure, cig);
  const budgetPlanned = parseBudget(matchOne(text, /\b(?:importo|valore|base di gara|valore affidamento|valore complessivo)\b[^0-9]{0,50}((?:\d{1,3}(?:[.\s]\d{3})+|\d+)(?:,\d{2})?)\s*(?:EUR|€)?/i));
  const contractor = cleanOptional(matchOne(text, /\b(?:aggiudicatario|affidatario|operatore economico|contraente)\b\s*[:\-]?\s*([A-ZÀ-Ú0-9][^.;,\n]{3,140})/i));
  const publicationDate = matchOne(text, /\b(?:pubblicazione|pubblicato|data pubblicazione|pubblicata)\b[^0-9]{0,40}(\d{1,2}[/-]\d{1,2}[/-]\d{4}|\d{4}-\d{2}-\d{2})/i);
  const deadline = matchOne(text, /\b(?:scadenza|termine offerte|presentazione offerte)\b[^0-9]{0,40}(\d{1,2}[/-]\d{1,2}[/-]\d{4}|\d{4}-\d{2}-\d{2})/i);
  const statusLabel = cleanStatus(matchOne(text, /\b(?:stato|esito)\b\s*[:\-]?\s*([A-ZÀ-Ú][^.;\n]{3,100})/i));
  const procurementMethod = inferProcurementMethod(text);

  if (!cig && !procedure && !looksLikeProcurementTitle(title, text)) {
    return null;
  }

  return {
    title,
    sourceUrl,
    authority: "Comune di Piacenza",
    location: "Piacenza",
    cig,
    cup,
    contractor,
    budgetPlanned,
    procurementMethod,
    publicationDate,
    deadline,
    statusLabel,
    rawText: text,
    confidence: cig || procedure ? "medium" : "low",
  };
}

function extractTitle(text: string, procedure: string | null, cig: string | null) {
  const explicit = matchOne(text, /\b(?:oggetto|titolo|descrizione)\b\s*[:\-]?\s*([^.;\n]{12,220})/i);
  if (explicit) return cleanTitle(explicit);

  const sentence = text
    .split(/(?<=[.!?])\s+/)
    .find((part) => /gara|affidamento|appalto|procedura|servizio|lavori|fornitura/i.test(part));

  if (sentence) return cleanTitle(sentence.slice(0, 220));
  if (procedure) return `Procedura ${procedure}`;
  if (cig) return `Affidamento CIG ${cig}`;
  return "Affidamento pubblico Piacenza";
}

function inferProcurementMethod(text: string) {
  if (/affidamento diretto/i.test(text)) return "Affidamento diretto";
  if (/procedura aperta/i.test(text)) return "Procedura aperta";
  if (/procedura negoziata/i.test(text)) return "Procedura negoziata";
  if (/concessione/i.test(text)) return "Concessione";
  if (/esito/i.test(text)) return "Esito di gara";
  if (/gara/i.test(text)) return "Procedura di gara";
  return null;
}

function matchOne(text: string, regex: RegExp) {
  return regex.exec(text)?.[1]?.trim() ?? null;
}

function parseBudget(value: string | null) {
  if (!value) return null;
  const normalized = value.replace(/\s/g, "").replace(/\./g, "").replace(",", ".");
  const numeric = Number(normalized);
  return Number.isFinite(numeric) ? numeric : null;
}

function cleanOptional(value: string | null) {
  if (!value) return null;
  const cleaned = value.replace(/\s+/g, " ").trim();
  return cleaned.length > 0 ? cleaned : null;
}

function cleanTitle(value: string) {
  return value
    .replace(/\s+/g, " ")
    .replace(/Tipologia appalto\s*:.*$/i, "")
    .replace(/\s+[|·-]\s*$/, "")
    .trim();
}

function cleanStatus(value: string | null) {
  if (!value) return null;
  return value
    .replace(/\s+Visualizza scheda.*$/i, "")
    .replace(/\s+Stazione appaltante.*$/i, "")
    .replace(/\s+Titolo\s*:.*$/i, "")
    .replace(/\s+/g, " ")
    .trim() || null;
}

function looksLikeProcurementTitle(title: string, text: string) {
  return /gara|affidamento|appalto|procedura|cig|cup|determina|concessione/i.test(`${title} ${text}`);
}

function dedupeFindings(findings: ResearchFinding[]) {
  const seen = new Set<string>();
  return findings.filter((finding) => {
    const key = finding.cig || `${finding.sourceUrl}:${finding.title.toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function isSupportedTextContent(contentType: string | null, url: string) {
  const normalized = (contentType ?? "").toLowerCase();
  if (normalized.includes("text/")) return true;
  if (normalized.includes("html") || normalized.includes("xml") || normalized.includes("json")) return true;

  // Minimal pipeline: collect PDF URL as source, but do not parse binary PDFs yet.
  if (normalized.includes("pdf") || url.toLowerCase().includes(".pdf")) return false;

  return false;
}

function stripHtml(value: string) {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ");
}

function normalizeText(value: string) {
  return decodeHtmlEntities(value)
    .replace(/\s+/g, " ")
    .trim();
}

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, "\"")
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}
