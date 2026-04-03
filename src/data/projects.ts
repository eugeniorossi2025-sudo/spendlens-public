export type ProjectTimelineEvent = {
  date: string;
  label: string;
  note: string;
};

export type SpendingProject = {
  slug: string;
  code: string;
  title: string;
  authority: string;
  location: string;
  sector: string;
  contractor: string;
  procurementMethod: string;
  statusLabel: string;
  summary: string;
  budgetPlanned: number | null;
  budgetActual: number | null;
  timelinePlannedDays: number | null;
  timelineActualDays: number | null;
  completionPct: number;
  updatedAt: string;
  dataCoveragePct: number;
  sourceCount: number;
  sourceQuality: "high" | "medium" | "low";
  milestones: ProjectTimelineEvent[];
};

export const projects: SpendingProject[] = [
  {
    slug: "piacenza-school-meal-quality-control",
    code: "PC-EDU-001",
    title: "Piacenza school meal quality control service",
    authority: "Comune di Piacenza",
    location: "Piacenza, Italy",
    sector: "School services",
    contractor: "Awardee not identified in the public documents reviewed",
    procurementMethod: "Official public procurement dossier",
    statusLabel: "Monitored service",
    summary: "Official dossier for the quality-control service over school catering in municipal nurseries and state schools. Public sources reviewed show a defined contract window and an estimated value, but not the full award chain in the material examined so far.",
    budgetPlanned: 213607.83,
    budgetActual: null,
    timelinePlannedDays: 943,
    timelineActualDays: null,
    completionPct: 0,
    updatedAt: "2026-04-03",
    dataCoveragePct: 72,
    sourceCount: 3,
    sourceQuality: "medium",
    milestones: [
      { date: "2023-01-01", label: "Service window opened", note: "The technical dossier reviewed sets the ordinary contract start on 1 January 2023." },
      { date: "2025-07-31", label: "Ordinary term", note: "The same dossier indicates an ordinary duration up to 31 July 2025." },
      { date: "2025-2026", label: "Optional continuation", note: "Public text reviewed includes an optional repetition for the 2025-2026 school year and a six-month technical extension scenario." },
      { date: "2026-04-03", label: "Monitoring note", note: "SpendLens classified this card as yellow because the reviewed public material gives planned value and duration, but not the complete award outcome in the sources checked." }
    ]
  },
  {
    slug: "piacenza-school-bus-service",
    code: "PC-EDU-002",
    title: "Piacenza school bus service",
    authority: "Comune di Piacenza",
    location: "Piacenza, Italy",
    sector: "School services",
    contractor: "External operator mentioned, not named on the service page reviewed",
    procurementMethod: "Official active service page",
    statusLabel: "Monitored service",
    summary: "The Comune publishes the school transport service as active for selected schools and explicitly states that it is entrusted to an external company. The reviewed source is useful for service monitoring, but it does not expose contract amount or award details.",
    budgetPlanned: null,
    budgetActual: null,
    timelinePlannedDays: null,
    timelineActualDays: null,
    completionPct: 0,
    updatedAt: "2026-04-03",
    dataCoveragePct: 49,
    sourceCount: 2,
    sourceQuality: "medium",
    milestones: [
      { date: "2025-09-01", label: "Enrollment reopened", note: "The official page reviewed states that school transport enrollments reopen from 1 September 2025." },
      { date: "2025-2026", label: "Covered routes published", note: "Public text reviewed lists the schools served and notes that the service runs with two daily trips, Monday to Friday, following the school calendar." },
      { date: "2025-2026", label: "External contractor noted", note: "The same official page says the service is entrusted to an external company, but does not identify the operator in the extracted content." },
      { date: "2026-04-03", label: "Monitoring note", note: "SpendLens marks this card yellow because the service is clearly public and active, but the reviewed source does not yet provide tender value, CIG, or award act." }
    ]
  },
  {
    slug: "piacenza-school-disability-integration-service",
    code: "PC-EDU-003",
    title: "Piacenza school disability integration service",
    authority: "Comune di Piacenza",
    location: "Piacenza, Italy",
    sector: "School services",
    contractor: "Specialist educational support personnel, operator not named on the service page reviewed",
    procurementMethod: "Official service page and provincial framework reference",
    statusLabel: "Monitored service",
    summary: "The Comune publishes a dedicated integration service for pupils with certified disabilities and links it to the provincial framework agreement for school inclusion. The public page reviewed documents scope and access conditions, but not the underlying procurement amount.",
    budgetPlanned: null,
    budgetActual: null,
    timelinePlannedDays: null,
    timelineActualDays: null,
    completionPct: 0,
    updatedAt: "2026-04-03",
    dataCoveragePct: 52,
    sourceCount: 2,
    sourceQuality: "medium",
    milestones: [
      { date: "2024-10-31", label: "Service page updated", note: "The official page reviewed was last updated on 31 October 2024." },
      { date: "School year", label: "Access condition documented", note: "Families request support through the school, with diagnostic certification and UONPIA indication mentioned in the published text." },
      { date: "School year", label: "Scope extended", note: "The public page reviewed states that the Comune also supports integration in some private or extra-municipal school situations through reimbursements or educational support." },
      { date: "2026-04-03", label: "Monitoring note", note: "SpendLens classifies this file as yellow because service scope is explicit in public sources, but the reviewed material does not yet expose contract value or operator identity." }
    ]
  }
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
