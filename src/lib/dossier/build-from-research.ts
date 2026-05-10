import type { SpendingProject, ProjectSource, ProjectTimelineEvent } from "@/data/projects";
import type { RawDossierResearch, RawResearchFact, ResearchFinding } from "@/lib/research/types";

type BuildOptions = {
  generatedAt?: Date;
};

const REQUIRED_FACT_LABELS = {
  cig: "CIG",
  budget: "Importo",
  contractor: "Aggiudicatario",
  timeline: "Cronologia",
  status: "Stato avanzamento",
};

export function buildDossiersFromResearch(
  research: RawDossierResearch,
  options: BuildOptions = {},
): SpendingProject[] {
  const generatedAt = options.generatedAt ?? new Date();
  const findings = Array.isArray(research.findings) ? research.findings : [];
  if (findings.length > 0) {
    return findings.map((finding, index) => buildProjectFromFinding(research, finding, generatedAt, index));
  }

  const facts = Array.isArray(research.facts) ? research.facts : [];
  const evidence = facts.map((fact) => ({
    label: fact.label,
    value: `${fact.value} (fonte: ${fact.sourceUrl})`,
  }));
  const missingFacts = buildMissingFacts(research, facts);
  const valueKind = inferValueKind(research, facts);
  const budgetPlanned = valueKind === "public-spend" ? research.budgetPlanned : null;
  const budgetActual = valueKind === "award-value" ? research.budgetPlanned : null;
  const sourceCount = research.sources.length;
  const hasOfficialProcurementSource = research.sources.some((source) =>
    source.sourceKind === "portale-appalti" ||
    source.sourceKind === "anac" ||
    source.sourceKind === "ted-europa"
  );

  const project: SpendingProject = {
    slug: slugify(`${research.location}-${research.title}`),
    code: `PC-RAW-${formatDateCompact(generatedAt)}`,
    title: research.title || "Ricerca pubblica Piacenza",
    authority: research.authority || "Comune di Piacenza",
    location: `${research.location}, Italia`,
    sector: inferSector(research),
    contractor: research.contractor,
    procurementMethod: inferProcurementMethod(research),
    statusLabel: inferStatusLabel(facts),
    summary: buildSummary(research, missingFacts),
    budgetPlanned,
    budgetActual,
    timelinePlannedDays: null,
    timelineActualDays: null,
    completionPct: 0,
    updatedAt: generatedAt.toISOString().slice(0, 10),
    dataCoveragePct: calculateDataCoveragePct(research, facts, missingFacts),
    sourceCount,
    sourceQuality: hasOfficialProcurementSource ? "medium" : "low",
    dossierStrength: "partial",
    dossierNote: buildDossierNote(research, facts, missingFacts),
    valueKind,
    valueNote: buildValueNote(valueKind),
    evidence,
    missingFacts,
    sources: buildSources(research),
    milestones: buildMilestones(research),
  };

  return [project];
}

function buildProjectFromFinding(
  research: RawDossierResearch,
  finding: ResearchFinding,
  generatedAt: Date,
  index: number,
): SpendingProject {
  const facts = factsFromFinding(finding);
  const missingFacts = buildFindingMissingFacts(finding);
  const valueKind = inferFindingValueKind(finding);
  const sources = buildFindingSources(research, finding);

  return {
    slug: slugify(`${finding.location}-${finding.title}-${finding.cig ?? index + 1}`),
    code: `PC-RAW-${formatDateCompact(generatedAt)}-${String(index + 1).padStart(2, "0")}`,
    title: finding.title,
    authority: finding.authority,
    location: `${finding.location}, Italia`,
    sector: inferSectorFromText(`${finding.title} ${finding.rawText}`),
    contractor: finding.contractor,
    procurementMethod: finding.procurementMethod ?? "Ricerca pubblica preliminare",
    statusLabel: finding.statusLabel ?? "Stato non estratto",
    summary: `Bozza generata da finding pubblico su Piacenza. Fonte primaria: ${finding.sourceUrl}. Dati mancanti rilevati: ${missingFacts.length}.`,
    budgetPlanned: finding.budgetPlanned,
    budgetActual: null,
    timelinePlannedDays: null,
    timelineActualDays: null,
    completionPct: 0,
    updatedAt: generatedAt.toISOString().slice(0, 10),
    dataCoveragePct: calculateFindingCoveragePct(finding, missingFacts),
    sourceCount: sources.length,
    sourceQuality: finding.confidence === "high" ? "medium" : "low",
    dossierStrength: "partial",
    dossierNote: "Dossier parziale generato da finding automatico: richiede revisione umana prima della pubblicazione.",
    valueKind,
    valueNote: buildValueNote(valueKind),
    evidence: facts.map((fact) => ({
      label: fact.label,
      value: `${fact.value} (fonte: ${fact.sourceUrl})`,
    })),
    missingFacts,
    sources,
    milestones: buildFindingMilestones(finding),
  };
}

function buildMissingFacts(research: RawDossierResearch, facts: RawResearchFact[]) {
  const missing = new Set<string>(research.missingFacts ?? []);

  if (!hasFact(facts, REQUIRED_FACT_LABELS.cig)) {
    missing.add("CIG non estratto automaticamente.");
  }

  if (research.budgetPlanned === null && !hasFact(facts, REQUIRED_FACT_LABELS.budget)) {
    missing.add("Importo/base di gara non estratto automaticamente.");
  }

  if (research.contractor === null && !hasFact(facts, REQUIRED_FACT_LABELS.contractor)) {
    missing.add("Aggiudicatario/affidatario non estratto automaticamente.");
  }

  if (!Array.isArray(research.dates) || research.dates.length === 0) {
    missing.add("Cronologia/date procedurali non estratte automaticamente.");
  }

  if (!hasFact(facts, REQUIRED_FACT_LABELS.status)) {
    missing.add("Stato avanzamento procedura non estratto automaticamente.");
  }

  return [...missing];
}

function inferValueKind(research: RawDossierResearch, facts: RawResearchFact[]): SpendingProject["valueKind"] {
  const text = [
    research.title,
    research.rawText,
    ...facts.map((fact) => `${fact.label} ${fact.value}`),
  ].join(" ").toLowerCase();

  if (text.includes("concessione") || text.includes("valore complessivo stimato")) {
    return "concession-estimate";
  }

  if (text.includes("affidamento") || text.includes("aggiudicat")) {
    return research.budgetPlanned === null ? "not-published" : "award-value";
  }

  if (research.budgetPlanned !== null) {
    return "public-spend";
  }

  return "not-published";
}

function inferFindingValueKind(finding: ResearchFinding): SpendingProject["valueKind"] {
  const text = `${finding.title} ${finding.procurementMethod ?? ""} ${finding.rawText}`.toLowerCase();
  if (text.includes("concessione") || text.includes("valore complessivo stimato")) return "concession-estimate";
  if (finding.budgetPlanned !== null && /affidamento|aggiudicat|esito/.test(text)) return "award-value";
  if (finding.budgetPlanned !== null) return "public-spend";
  return "not-published";
}

function calculateDataCoveragePct(
  research: RawDossierResearch,
  facts: RawResearchFact[],
  missingFacts: string[],
) {
  let score = 20;
  if (research.sources.length > 0) score += 15;
  if (research.sources.some((source) => source.sourceKind === "portale-appalti")) score += 15;
  if (research.sources.some((source) => source.sourceKind === "anac")) score += 15;
  if (hasFact(facts, REQUIRED_FACT_LABELS.cig)) score += 10;
  if (research.budgetPlanned !== null || hasFact(facts, REQUIRED_FACT_LABELS.budget)) score += 10;
  if (research.contractor !== null || hasFact(facts, REQUIRED_FACT_LABELS.contractor)) score += 10;
  if (research.dates.length > 0) score += 5;

  score -= Math.min(30, missingFacts.length * 5);
  return Math.max(20, Math.min(95, score));
}

function buildSources(research: RawDossierResearch): ProjectSource[] {
  return research.sources.map((source) => ({
    label: source.title,
    url: source.url,
    note: `${source.sourceKind}; confidenza ${source.confidence}; status ${source.status ?? "non disponibile"}.`,
  }));
}

function buildFindingSources(research: RawDossierResearch, finding: ResearchFinding): ProjectSource[] {
  const primary = research.sources.find((source) => source.url === finding.sourceUrl);
  return [
    {
      label: primary?.title ?? finding.title,
      url: finding.sourceUrl,
      note: primary
        ? `${primary.sourceKind}; confidenza ${primary.confidence}; status ${primary.status ?? "non disponibile"}.`
        : "Fonte primaria del finding automatico.",
    },
  ];
}

function buildMilestones(research: RawDossierResearch): ProjectTimelineEvent[] {
  if (!research.dates.length) {
    return [];
  }

  return research.dates.map((date) => ({
    date,
    label: "Data estratta dalla ricerca",
    note: "Data rilevata automaticamente dal testo grezzo; richiede verifica prima della pubblicazione editoriale.",
  }));
}

function buildFindingMilestones(finding: ResearchFinding): ProjectTimelineEvent[] {
  const milestones: ProjectTimelineEvent[] = [];

  if (finding.publicationDate) {
    milestones.push({
      date: finding.publicationDate,
      label: "Data pubblicazione",
      note: `Data estratta automaticamente dalla fonte ${finding.sourceUrl}; richiede verifica.`,
    });
  }

  if (finding.deadline) {
    milestones.push({
      date: finding.deadline,
      label: "Scadenza",
      note: `Scadenza estratta automaticamente dalla fonte ${finding.sourceUrl}; richiede verifica.`,
    });
  }

  return milestones;
}

function buildSummary(research: RawDossierResearch, missingFacts: string[]) {
  const sourceLabels = research.sources.map((source) => source.sourceKind).join(", ") || "nessuna fonte classificata";
  return `Bozza generata da ricerca pubblica su Piacenza. Fonti collegate: ${sourceLabels}. Dati mancanti rilevati: ${missingFacts.length}.`;
}

function buildDossierNote(
  research: RawDossierResearch,
  facts: RawResearchFact[],
  missingFacts: string[],
) {
  const hasCig = hasFact(facts, REQUIRED_FACT_LABELS.cig);
  const hasBudget = research.budgetPlanned !== null || hasFact(facts, REQUIRED_FACT_LABELS.budget);

  if (hasCig && hasBudget && missingFacts.length <= 2) {
    return "Dossier preliminare con alcuni elementi ufficiali estratti; richiede revisione umana prima della pubblicazione.";
  }

  return "Dossier parziale: la ricerca ha collegato fonti pubbliche, ma mancano dati essenziali per una scheda forte.";
}

function buildValueNote(valueKind: SpendingProject["valueKind"]) {
  if (valueKind === "concession-estimate") {
    return "Valore da trattare come stima/concessione, non come spesa pubblica diretta, finche non verificato.";
  }

  if (valueKind === "award-value") {
    return "Valore di affidamento estratto da fonte pubblica; richiede verifica prima della pubblicazione.";
  }

  if (valueKind === "public-spend") {
    return "Valore pubblico estratto automaticamente; richiede verifica prima della pubblicazione.";
  }

  return "Valore economico non disponibile nella ricerca grezza.";
}

function inferProcurementMethod(research: RawDossierResearch) {
  if (research.sources.some((source) => source.sourceKind === "portale-appalti")) {
    return "Fonte portale appalti collegata automaticamente";
  }

  if (research.sources.some((source) => source.sourceKind === "anac")) {
    return "Pubblicazione ANAC collegata automaticamente";
  }

  return "Ricerca pubblica preliminare";
}

function inferStatusLabel(facts: RawResearchFact[]) {
  return hasFact(facts, REQUIRED_FACT_LABELS.status)
    ? firstFactValue(facts, REQUIRED_FACT_LABELS.status)
    : "Stato non estratto";
}

function inferSector(research: RawDossierResearch) {
  const text = `${research.title} ${research.keywords.join(" ")} ${research.rawText}`.toLowerCase();
  return inferSectorFromText(text);
}

function inferSectorFromText(text: string) {
  const lower = text.toLowerCase();
  if (lower.includes("scuola") || lower.includes("educazione")) return "Servizi scolastici";
  if (lower.includes("disabil") || lower.includes("sociale")) return "Inclusione e servizi sociali";
  if (lower.includes("mobilit") || lower.includes("trasporto")) return "Mobilita e trasporti";
  if (lower.includes("patrimonio") || lower.includes("immobili")) return "Patrimonio e spazi pubblici";
  return "Spesa pubblica locale";
}

function factsFromFinding(finding: ResearchFinding): RawResearchFact[] {
  const facts: RawResearchFact[] = [];
  if (finding.cig) facts.push({ label: "CIG", value: finding.cig, sourceUrl: finding.sourceUrl });
  if (finding.cup) facts.push({ label: "CUP", value: finding.cup, sourceUrl: finding.sourceUrl });
  if (finding.budgetPlanned !== null) facts.push({ label: "Importo", value: String(finding.budgetPlanned), sourceUrl: finding.sourceUrl });
  if (finding.contractor) facts.push({ label: "Aggiudicatario", value: finding.contractor, sourceUrl: finding.sourceUrl });
  if (finding.procurementMethod) facts.push({ label: "Procedura", value: finding.procurementMethod, sourceUrl: finding.sourceUrl });
  if (finding.publicationDate) facts.push({ label: "Data pubblicazione", value: finding.publicationDate, sourceUrl: finding.sourceUrl });
  if (finding.deadline) facts.push({ label: "Scadenza", value: finding.deadline, sourceUrl: finding.sourceUrl });
  if (finding.statusLabel) facts.push({ label: "Stato avanzamento", value: finding.statusLabel, sourceUrl: finding.sourceUrl });
  return facts;
}

function buildFindingMissingFacts(finding: ResearchFinding) {
  const missing: string[] = [];
  if (!finding.cig) missing.push("CIG non estratto automaticamente.");
  if (finding.budgetPlanned === null) missing.push("Importo/base di gara non estratto automaticamente.");
  if (finding.contractor === null) missing.push("Aggiudicatario/affidatario non estratto automaticamente.");
  if (!finding.publicationDate && !finding.deadline) missing.push("Cronologia/date procedurali non estratte automaticamente.");
  if (!finding.statusLabel) missing.push("Stato avanzamento procedura non estratto automaticamente.");
  return missing;
}

function calculateFindingCoveragePct(finding: ResearchFinding, missingFacts: string[]) {
  let score = 25;
  if (finding.cig) score += 15;
  if (finding.cup) score += 5;
  if (finding.budgetPlanned !== null) score += 15;
  if (finding.contractor) score += 10;
  if (finding.procurementMethod) score += 10;
  if (finding.publicationDate || finding.deadline) score += 10;
  if (finding.statusLabel) score += 10;
  score -= Math.min(25, missingFacts.length * 5);
  return Math.max(20, Math.min(70, score));
}

function hasFact(facts: RawResearchFact[], label: string) {
  return facts.some((fact) => fact.label.toLowerCase().includes(label.toLowerCase()));
}

function firstFactValue(facts: RawResearchFact[], label: string) {
  return facts.find((fact) => fact.label.toLowerCase().includes(label.toLowerCase()))?.value ?? label;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90) || "piacenza-research";
}

function formatDateCompact(value: Date) {
  return value.toISOString().slice(0, 10).replace(/-/g, "");
}
