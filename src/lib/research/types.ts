export type ResearchSourceKind =
  | "comune-piacenza"
  | "albo-pretorio"
  | "portale-appalti"
  | "anac"
  | "ted-europa"
  | "amministrazione-trasparente"
  | "public-pdf"
  | "other-public-source";

export type ResearchSource = {
  title: string;
  url: string;
  snippet?: string;
  query?: string;
};

export type ExtractedSource = ResearchSource & {
  fetchedAt: string;
  ok: boolean;
  status: number | null;
  contentType: string | null;
  rawText: string;
  findings: ResearchFinding[];
  error?: string;
};

export type ClassifiedSource = ExtractedSource & {
  sourceKind: ResearchSourceKind;
  confidence: "high" | "medium" | "low";
  matchedKeywords: string[];
  isPublicData: boolean;
};

export type RawResearchFact = {
  label: string;
  value: string;
  sourceUrl: string;
};

export type ResearchFinding = {
  title: string;
  sourceUrl: string;
  authority: string;
  location: "Piacenza";
  cig: string | null;
  cup: string | null;
  contractor: string | null;
  budgetPlanned: number | null;
  procurementMethod: string | null;
  publicationDate: string | null;
  deadline: string | null;
  statusLabel: string | null;
  rawText: string;
  confidence: "high" | "medium" | "low";
};

export type RawDossierResearch = {
  title: string;
  authority: string;
  location: "Piacenza";
  sources: Array<{
    title: string;
    url: string;
    sourceKind: ResearchSourceKind;
    confidence: "high" | "medium" | "low";
    fetchedAt: string;
    status: number | null;
    contentType: string | null;
  }>;
  rawText: string;
  budgetPlanned: number | null;
  contractor: string | null;
  dates: string[];
  keywords: string[];
  facts: RawResearchFact[];
  findings: ResearchFinding[];
  missingFacts: string[];
};
