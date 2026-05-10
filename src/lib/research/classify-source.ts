import type { ExtractedSource, ResearchSourceKind } from "./types";

const SOURCE_RULES: Array<{
  kind: ResearchSourceKind;
  hostIncludes: string[];
  pathIncludes?: string[];
  keywords: string[];
}> = [
  {
    kind: "portale-appalti",
    hostIncludes: ["appalti.comune.piacenza.it"],
    keywords: ["cig", "procedura", "gara", "esito", "affidamento"],
  },
  {
    kind: "anac",
    hostIncludes: ["anticorruzione.it"],
    keywords: ["anac", "pubblicita legale", "cig", "affidamento", "valore"],
  },
  {
    kind: "ted-europa",
    hostIncludes: ["ted.europa.eu"],
    keywords: ["ted", "notice", "contract", "appalto"],
  },
  {
    kind: "albo-pretorio",
    hostIncludes: ["comune.piacenza.it"],
    pathIncludes: ["albo", "pretorio"],
    keywords: ["albo", "determinazione", "determina", "affidamento"],
  },
  {
    kind: "amministrazione-trasparente",
    hostIncludes: ["comune.piacenza.it"],
    pathIncludes: ["amministrazione-trasparente"],
    keywords: ["amministrazione trasparente", "bandi", "contratti", "affidamenti"],
  },
  {
    kind: "comune-piacenza",
    hostIncludes: ["comune.piacenza.it"],
    keywords: ["comune di piacenza", "servizio", "procedura", "determinazione"],
  },
  {
    kind: "public-pdf",
    hostIncludes: [],
    pathIncludes: [".pdf"],
    keywords: ["determina", "affidamento", "cig", "importo"],
  },
];

export function classifySource(source: ExtractedSource) {
  const url = safeUrl(source.url);
  const host = url?.hostname.toLowerCase() ?? "";
  const path = url ? `${url.pathname}${url.search}`.toLowerCase() : source.url.toLowerCase();
  const text = `${source.title} ${source.snippet ?? ""} ${source.rawText}`.toLowerCase();

  for (const rule of SOURCE_RULES) {
    const hostMatches = rule.hostIncludes.length === 0 || rule.hostIncludes.some((part) => host.includes(part));
    const pathMatches = !rule.pathIncludes || rule.pathIncludes.some((part) => path.includes(part));

    if (!hostMatches || !pathMatches) continue;

    const matchedKeywords = rule.keywords.filter((keyword) => text.includes(keyword));
    return {
      ...source,
      sourceKind: rule.kind,
      confidence: matchedKeywords.length >= 2 ? "high" as const : "medium" as const,
      matchedKeywords,
      isPublicData: true,
    };
  }

  const publicKeywords = ["cig", "appalto", "affidamento", "determina", "anac", "bdncp", "gara"];
  const matchedKeywords = publicKeywords.filter((keyword) => text.includes(keyword));

  return {
    ...source,
    sourceKind: "other-public-source" as const,
    confidence: matchedKeywords.length > 0 ? "low" as const : "low" as const,
    matchedKeywords,
    isPublicData: matchedKeywords.length > 0,
  };
}

function safeUrl(value: string) {
  try {
    return new URL(value);
  } catch {
    return null;
  }
}
