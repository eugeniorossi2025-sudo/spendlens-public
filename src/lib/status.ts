import { projects, type SpendingProject } from "@/data/projects";

export type Severity = "green" | "yellow" | "red";

export type ProjectHealth = {
  overall: Severity;
  cost: Severity;
  time: Severity;
  data: Severity;
  costDeltaPct: number | null;
  timeDeltaPct: number | null;
};

const severityWeight: Record<Severity, number> = {
  green: 0,
  yellow: 1,
  red: 2,
};

export function calculateDeltaPct(actual: number | null, planned: number): number | null {
  if (actual === null || !Number.isFinite(actual) || !Number.isFinite(planned) || planned <= 0) {
    return null;
  }
  return ((actual - planned) / planned) * 100;
}

export function evaluateProject(project: SpendingProject): ProjectHealth {
  const costDeltaPct = calculateDeltaPct(project.budgetActual, project.budgetPlanned);
  const timeDeltaPct = calculateDeltaPct(project.timelineActualDays, project.timelinePlannedDays);

  const data = project.budgetActual === null || project.timelineActualDays === null || project.dataCoveragePct < 75
    ? "yellow"
    : project.dataCoveragePct >= 90
      ? "green"
      : "yellow";

  const cost = costDeltaPct === null
    ? "yellow"
    : costDeltaPct > 20
      ? "red"
      : costDeltaPct > 10
        ? "yellow"
        : "green";

  const time = timeDeltaPct === null
    ? "yellow"
    : timeDeltaPct > 30
      ? "red"
      : timeDeltaPct > 15
        ? "yellow"
        : "green";

  const overall = ([cost, time, data] as Severity[])
    .sort((left, right) => severityWeight[right] - severityWeight[left])[0];

  return {
    overall,
    cost,
    time,
    data,
    costDeltaPct,
    timeDeltaPct,
  };
}

export function formatCurrency(value: number | null) {
  if (value === null || !Number.isFinite(value)) return "Data pending";
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number | null) {
  if (value === null || !Number.isFinite(value)) return "Data pending";
  return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
}

export function countBySeverity() {
  return projects.reduce(
    (acc, project) => {
      const health = evaluateProject(project);
      acc[health.overall] += 1;
      return acc;
    },
    { green: 0, yellow: 0, red: 0 },
  );
}

export function totalsSnapshot() {
  return projects.reduce(
    (acc, project) => {
      acc.planned += project.budgetPlanned;
      acc.actual += project.budgetActual ?? 0;
      return acc;
    },
    { planned: 0, actual: 0 },
  );
}
