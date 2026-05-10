import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { classifySource } from "../src/lib/research/classify-source";
import { extractSource } from "../src/lib/research/extract-source";
import { searchSources } from "../src/lib/research/search-sources";
import type { ClassifiedSource, RawDossierResearch, RawResearchFact, ResearchFinding, ResearchSource } from "../src/lib/research/types";

const DEFAULT_QUERIES = [
  "site:appalti.comune.piacenza.it Piacenza affidamento CIG",
  "site:appalti.comune.piacenza.it Piacenza esito gara",
  "site:comune.piacenza.it \"amministrazione trasparente\" affidamenti Piacenza",
  "site:comune.piacenza.it albo pretorio determina affidamento Piacenza",
  "site:pubblicitalegale.anticorruzione.it Piacenza affidamento",
  "site:ted.europa.eu Piacenza appalto",
  "Piacenza BDNCP affidamento CIG",
];

const SEED_SOURCES: ResearchSource[] = [
  {
    title: "Portale Appalti Comune di Piacenza - Gare",
    url: "https://appalti.comune.piacenza.it/PortaleAppalti/it/ppgare_bandi_lista.wp",
    snippet: "Fonte prioritaria per bandi e procedure del Comune di Piacenza.",
    query: "seed",
  },
  {
    title: "Portale Appalti Comune di Piacenza - Esiti",
    url: "https://appalti.comune.piacenza.it/PortaleAppalti/it/ppgare_esiti_lista.wp",
    snippet: "Fonte prioritaria per esiti, affidamenti e aggiudicazioni del Comune di Piacenza.",
    query: "seed",
  },
  {
    title: "Comune di Piacenza",
    url: "https://www.comune.piacenza.it/",
    snippet: "Fonte istituzionale primaria.",
    query: "seed",
  },
];

async function main() {
  const maxResultsPerQuery = Number(process.env.SPENDLENS_RESEARCH_MAX_RESULTS ?? "3");
  const queryArg = process.argv.slice(2).join(" ").trim();
  const queries = queryArg ? [queryArg] : DEFAULT_QUERIES;

  console.log(`[research] queries=${queries.length} maxResultsPerQuery=${maxResultsPerQuery}`);

  const sources = await searchSources({
    queries,
    maxResultsPerQuery,
    seedSources: SEED_SOURCES,
  });

  console.log(`[research] sources collected=${sources.length}`);

  const classifiedSources: ClassifiedSource[] = [];
  for (const source of sources) {
    console.log(`[research] fetching ${source.url}`);
    const extracted = await extractSource(source);
    const classified = classifySource(extracted);
    classifiedSources.push(classified);
    console.log(`[research] source kind=${classified.sourceKind} status=${classified.status ?? "ERR"} public=${classified.isPublicData}`);
  }

  const publicSources = classifiedSources.filter((source) => isPriorityPublicHost(source.url));
  const raw = buildRawDossierResearch(publicSources);
  const outDir = path.join(process.cwd(), "src", "data", "raw");
  await mkdir(outDir, { recursive: true });

  const fileName = `piacenza-research-${new Date().toISOString().slice(0, 10)}.json`;
  const outPath = path.join(outDir, fileName);
  await writeFile(outPath, `${JSON.stringify(raw, null, 2)}\n`, "utf8");

  console.log(`[research] wrote ${outPath}`);
}

function buildRawDossierResearch(sources: ClassifiedSource[]): RawDossierResearch {
  const combinedText = sources
    .map((source) => source.rawText)
    .filter(Boolean)
    .join("\n\n--- SOURCE ---\n\n")
    .slice(0, 40_000);

  const facts = collectFacts(sources);
  const findings = collectFindings(sources);
  const budgetPlanned = firstBudget(facts);
  const contractor = firstFactValue(facts, ["aggiudicatario", "operatore", "contractor"]);
  const dates = collectDates(sources);
  const keywords = collectKeywords(sources);

  return {
    title: inferTitle(sources),
    authority: "Comune di Piacenza",
    location: "Piacenza",
    sources: sources.map((source) => ({
      title: source.title,
      url: source.url,
      sourceKind: source.sourceKind,
      confidence: source.confidence,
      fetchedAt: source.fetchedAt,
      status: source.status,
      contentType: source.contentType,
    })),
    rawText: combinedText,
    budgetPlanned,
    contractor,
    dates,
    keywords,
    facts,
    findings,
    missingFacts: buildMissingFacts({ budgetPlanned, contractor, dates, sources }),
  };
}

function collectFacts(sources: ClassifiedSource[]): RawResearchFact[] {
  const facts: RawResearchFact[] = [];

  for (const source of sources) {
    addMatches(facts, source, "CIG", /\bCIG\b\s*[:\-]?\s*([A-Z0-9]{8,12})/gi);
    addMatches(facts, source, "CUP", /\bCUP\b\s*[:\-]?\s*([A-Z0-9]{10,20})/gi);
    addMatches(facts, source, "Importo", /\b(?:importo|valore|base di gara)\b[^0-9]{0,40}((?:\d{1,3}(?:[.\s]\d{3})+|\d+)(?:,\d{2})?)\s*(?:EUR|€)?/gi);
    addMatches(facts, source, "Procedura", /\b(G\d{4,6})\b/gi);
    addMatches(facts, source, "Aggiudicatario", /\b(?:aggiudicatario|affidatario|operatore economico)\b\s*[:\-]?\s*([A-ZÀ-Ú0-9][^.;,\n]{3,120})/gi);
    for (const finding of source.findings) {
      addFindingFacts(facts, finding);
    }
  }

  return dedupeFacts(facts);
}

function collectFindings(sources: ClassifiedSource[]): ResearchFinding[] {
  const seen = new Set<string>();
  const findings: ResearchFinding[] = [];

  for (const source of sources) {
    for (const finding of source.findings) {
      const key = finding.cig || `${finding.sourceUrl}:${finding.title.toLowerCase()}`;
      if (seen.has(key)) continue;
      seen.add(key);
      findings.push(finding);
    }
  }

  return findings;
}

function addFindingFacts(facts: RawResearchFact[], finding: ResearchFinding) {
  if (finding.cig) facts.push({ label: "CIG", value: finding.cig, sourceUrl: finding.sourceUrl });
  if (finding.cup) facts.push({ label: "CUP", value: finding.cup, sourceUrl: finding.sourceUrl });
  if (finding.budgetPlanned !== null) facts.push({ label: "Importo", value: String(finding.budgetPlanned), sourceUrl: finding.sourceUrl });
  if (finding.contractor) facts.push({ label: "Aggiudicatario", value: finding.contractor, sourceUrl: finding.sourceUrl });
  if (finding.statusLabel) facts.push({ label: "Stato avanzamento", value: finding.statusLabel, sourceUrl: finding.sourceUrl });
  if (finding.publicationDate) facts.push({ label: "Data pubblicazione", value: finding.publicationDate, sourceUrl: finding.sourceUrl });
  if (finding.deadline) facts.push({ label: "Scadenza", value: finding.deadline, sourceUrl: finding.sourceUrl });
}

function addMatches(facts: RawResearchFact[], source: ClassifiedSource, label: string, regex: RegExp) {
  for (const match of source.rawText.matchAll(regex)) {
    const value = match[1]?.trim();
    if (!value) continue;
    facts.push({ label, value, sourceUrl: source.url });
  }
}

function dedupeFacts(facts: RawResearchFact[]) {
  const seen = new Set<string>();
  return facts.filter((fact) => {
    const key = `${fact.label}:${fact.value}:${fact.sourceUrl}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function firstBudget(facts: RawResearchFact[]) {
  const fact = facts.find((item) => item.label === "Importo");
  if (!fact) return null;
  const normalized = fact.value.replace(/\s/g, "").replace(/\./g, "").replace(",", ".");
  const value = Number(normalized);
  return Number.isFinite(value) ? value : null;
}

function firstFactValue(facts: RawResearchFact[], labels: string[]) {
  const lowered = labels.map((label) => label.toLowerCase());
  return facts.find((fact) => lowered.some((label) => fact.label.toLowerCase().includes(label)))?.value ?? null;
}

function collectDates(sources: ClassifiedSource[]) {
  const seen = new Set<string>();
  const dates: string[] = [];
  const dateRegex = /\b(?:\d{1,2}[/-]\d{1,2}[/-]\d{4}|\d{4}-\d{2}-\d{2})\b/g;

  for (const source of sources) {
    for (const match of source.rawText.matchAll(dateRegex)) {
      const value = match[0];
      if (!seen.has(value)) {
        seen.add(value);
        dates.push(value);
      }
    }
  }

  return dates.slice(0, 30);
}

function collectKeywords(sources: ClassifiedSource[]) {
  return [...new Set(sources.flatMap((source) => source.matchedKeywords))]
    .filter(Boolean)
    .sort();
}

function buildMissingFacts(input: {
  budgetPlanned: number | null;
  contractor: string | null;
  dates: string[];
  sources: ClassifiedSource[];
}) {
  const missing: string[] = [];
  if (input.budgetPlanned === null) missing.push("Importo/base di gara non estratto automaticamente.");
  if (input.contractor === null) missing.push("Aggiudicatario/affidatario non estratto automaticamente.");
  if (input.dates.length === 0) missing.push("Date procedurali non estratte automaticamente.");
  if (!input.sources.some((source) => source.sourceKind === "anac")) missing.push("Fonte ANAC non collegata in questa ricerca.");
  if (!input.sources.some((source) => source.sourceKind === "portale-appalti")) missing.push("Fonte portale appalti non collegata in questa ricerca.");
  return missing;
}

function inferTitle(sources: ClassifiedSource[]) {
  const best = sources.find((source) => source.sourceKind === "portale-appalti") ?? sources[0];
  return best?.title ?? "Ricerca pubblica Piacenza";
}

function isPriorityPublicHost(value: string) {
  try {
    const host = new URL(value).hostname.toLowerCase();
    return [
      "comune.piacenza.it",
      "appalti.comune.piacenza.it",
      "anticorruzione.it",
      "ted.europa.eu",
    ].some((part) => host.includes(part));
  } catch {
    return false;
  }
}

main().catch((error) => {
  console.error("[research] failed", error);
  process.exitCode = 1;
});
