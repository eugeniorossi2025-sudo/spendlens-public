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
  budgetPlanned: number;
  budgetActual: number | null;
  timelinePlannedDays: number;
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
    slug: "metro-line-east-extension",
    code: "IT-MIL-001",
    title: "Metro Line East Extension",
    authority: "City Mobility Agency",
    location: "Milan, Italy",
    sector: "Transport",
    contractor: "Urban Rail Consortium",
    procurementMethod: "Open tender",
    statusLabel: "Execution",
    summary: "Underground extension connecting three underserved districts to the central network.",
    budgetPlanned: 480000000,
    budgetActual: 502000000,
    timelinePlannedDays: 1240,
    timelineActualDays: 1185,
    completionPct: 82,
    updatedAt: "2026-04-01",
    dataCoveragePct: 96,
    sourceCount: 6,
    sourceQuality: "high",
    milestones: [
      { date: "2023-02-10", label: "Tender published", note: "International open tender released." },
      { date: "2023-09-28", label: "Contract awarded", note: "Award signed after technical and financial review." },
      { date: "2024-03-15", label: "Civil works started", note: "Primary excavation and utility relocation started." },
      { date: "2026-03-20", label: "Station shell completed", note: "Main station shell completed for two of three stations." }
    ]
  },
  {
    slug: "national-hospital-digital-upgrade",
    code: "FR-PAR-014",
    title: "National Hospital Digital Upgrade",
    authority: "Ministry of Health",
    location: "Paris, France",
    sector: "Health",
    contractor: "Synapse Public Systems",
    procurementMethod: "Framework agreement",
    statusLabel: "Execution",
    summary: "Upgrade of patient records, operating theatre scheduling and procurement monitoring.",
    budgetPlanned: 120000000,
    budgetActual: 158000000,
    timelinePlannedDays: 620,
    timelineActualDays: 840,
    completionPct: 67,
    updatedAt: "2026-03-29",
    dataCoveragePct: 93,
    sourceCount: 5,
    sourceQuality: "high",
    milestones: [
      { date: "2024-01-08", label: "Programme approved", note: "National digital health envelope approved." },
      { date: "2024-05-22", label: "Supplier selected", note: "Lead integrator selected through accelerated procedure." },
      { date: "2025-04-03", label: "Pilot launched", note: "Three hospitals migrated to the new stack." },
      { date: "2026-03-12", label: "Delay notice", note: "Migration dependencies extended delivery schedule." }
    ]
  },
  {
    slug: "school-energy-retrofit-pack",
    code: "ES-MAD-022",
    title: "School Energy Retrofit Pack",
    authority: "Regional Education Office",
    location: "Madrid, Spain",
    sector: "Education",
    contractor: "Iberia Retrofit Group",
    procurementMethod: "Open tender",
    statusLabel: "Execution",
    summary: "Energy efficiency works for 41 public schools with heating, insulation and solar upgrades.",
    budgetPlanned: 86000000,
    budgetActual: 82400000,
    timelinePlannedDays: 540,
    timelineActualDays: 498,
    completionPct: 88,
    updatedAt: "2026-03-30",
    dataCoveragePct: 91,
    sourceCount: 4,
    sourceQuality: "medium",
    milestones: [
      { date: "2024-06-11", label: "Funding secured", note: "Regional and EU co-funding package confirmed." },
      { date: "2024-09-02", label: "Works started", note: "First cluster of schools entered construction." },
      { date: "2025-11-18", label: "Solar package delivered", note: "Photovoltaic systems installed on 28 sites." },
      { date: "2026-03-28", label: "Ahead of schedule", note: "Final commissioning wave brought timeline forward." }
    ]
  },
  {
    slug: "rural-water-grid-phase-2",
    code: "RO-CLJ-009",
    title: "Rural Water Grid Phase 2",
    authority: "Regional Infrastructure Fund",
    location: "Cluj County, Romania",
    sector: "Utilities",
    contractor: "Danube Civil Works",
    procurementMethod: "Competitive dialogue",
    statusLabel: "Procurement",
    summary: "Expansion of rural drinking water access across 17 municipalities.",
    budgetPlanned: 64000000,
    budgetActual: null,
    timelinePlannedDays: 730,
    timelineActualDays: null,
    completionPct: 14,
    updatedAt: "2026-03-18",
    dataCoveragePct: 61,
    sourceCount: 2,
    sourceQuality: "low",
    milestones: [
      { date: "2025-10-02", label: "Pre-feasibility complete", note: "Hydrology and distribution assessment completed." },
      { date: "2026-01-15", label: "Dialogue opened", note: "Qualified bidders entered structured dialogue phase." },
      { date: "2026-03-11", label: "Data gap flagged", note: "No validated cost update published for phase 2 packages." }
    ]
  },
  {
    slug: "coastal-flood-barrier-repair",
    code: "NL-RTM-031",
    title: "Coastal Flood Barrier Repair",
    authority: "National Water Authority",
    location: "Rotterdam, Netherlands",
    sector: "Climate",
    contractor: "North Sea Delta JV",
    procurementMethod: "Restricted procedure",
    statusLabel: "Execution",
    summary: "Critical barrier reinforcement and sensor replacement programme after storm damage.",
    budgetPlanned: 210000000,
    budgetActual: 224500000,
    timelinePlannedDays: 410,
    timelineActualDays: 460,
    completionPct: 74,
    updatedAt: "2026-04-02",
    dataCoveragePct: 98,
    sourceCount: 7,
    sourceQuality: "high",
    milestones: [
      { date: "2025-01-17", label: "Emergency approval", note: "Fast-track repair programme approved." },
      { date: "2025-05-09", label: "Contract signed", note: "Civil and sensors package signed." },
      { date: "2025-09-21", label: "Offshore works started", note: "Barrier reinforcement began offshore." },
      { date: "2026-03-27", label: "Sensor calibration", note: "New sensor grid calibration entered final stage." }
    ]
  },
  {
    slug: "open-fiber-corridor-south",
    code: "PT-LIS-018",
    title: "Open Fiber Corridor South",
    authority: "Digital Infrastructure Agency",
    location: "Lisbon Region, Portugal",
    sector: "Digital",
    contractor: "Lusonet Infra",
    procurementMethod: "Open tender",
    statusLabel: "Execution",
    summary: "Backbone fiber programme for schools, clinics and municipal services.",
    budgetPlanned: 94000000,
    budgetActual: 93750000,
    timelinePlannedDays: 680,
    timelineActualDays: 702,
    completionPct: 79,
    updatedAt: "2026-03-26",
    dataCoveragePct: 89,
    sourceCount: 4,
    sourceQuality: "medium",
    milestones: [
      { date: "2024-04-04", label: "Funding line approved", note: "Cabinet approved the national digital corridor package." },
      { date: "2024-10-12", label: "Construction started", note: "First trenching package launched." },
      { date: "2025-08-30", label: "Public facilities connected", note: "52 schools and 11 clinics connected." },
      { date: "2026-03-01", label: "Minor delay", note: "Permitting delay affected one southern segment." }
    ]
  }
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
