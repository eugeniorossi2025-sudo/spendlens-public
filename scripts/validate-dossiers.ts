import { projects } from "../src/data/projects";

type CheckResult = {
  errors: string[];
  warnings: string[];
};

const result: CheckResult = {
  errors: [],
  warnings: [],
};

const slugs = new Set<string>();
const codes = new Set<string>();
const cigs = new Map<string, string>();

for (const project of projects) {
  if (slugs.has(project.slug)) {
    result.errors.push(`Duplicate slug: ${project.slug}`);
  }
  slugs.add(project.slug);

  if (codes.has(project.code)) {
    result.errors.push(`Duplicate code: ${project.code}`);
  }
  codes.add(project.code);

  if (project.sources.length === 0) {
    result.errors.push(`${project.code}: no sources declared`);
  }

  if (!project.sources.some((source) => source.url)) {
    result.warnings.push(`${project.code}: no visible source URL`);
  }

  for (const evidence of project.evidence) {
    if (!/cig/i.test(evidence.label)) continue;
    const cig = evidence.value.trim().toUpperCase();
    const previous = cigs.get(cig);
    if (previous && previous !== project.code) {
      result.errors.push(`Duplicate CIG ${cig}: ${previous} and ${project.code}`);
    }
    cigs.set(cig, project.code);
  }

  if (project.valueKind === "concession-estimate") {
    const text = `${project.summary} ${project.valueNote} ${project.dossierNote}`.toLowerCase();
    if (!text.includes("concessione")) {
      result.errors.push(`${project.code}: concession-estimate without concession qualification`);
    }
    if (!text.includes("non") || !text.includes("spesa")) {
      result.warnings.push(`${project.code}: concession value should explicitly avoid direct-spend interpretation`);
    }
  }

  if (project.missingFacts.length > 0 && project.dossierStrength === "strong") {
    result.warnings.push(`${project.code}: strong dossier still has ${project.missingFacts.length} missing facts`);
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(project.updatedAt)) {
    result.errors.push(`${project.code}: updatedAt must be YYYY-MM-DD`);
  }
}

const sourceChecks = await checkSourceUrls();
result.errors.push(...sourceChecks.errors);
result.warnings.push(...sourceChecks.warnings);

console.log(`SpendAgent dossier validation: ${projects.length} dossiers`);
console.log(`Errors: ${result.errors.length}`);
console.log(`Warnings: ${result.warnings.length}`);

for (const warning of result.warnings) {
  console.warn(`[warning] ${warning}`);
}

for (const error of result.errors) {
  console.error(`[error] ${error}`);
}

if (result.errors.length > 0) {
  process.exitCode = 1;
}

async function checkSourceUrls(): Promise<CheckResult> {
  const output: CheckResult = { errors: [], warnings: [] };
  const urls = [...new Set(projects.flatMap((project) => project.sources.map((source) => source.url).filter(Boolean)))] as string[];

  for (const url of urls) {
    const status = await probeUrl(url);
    if (status === null) {
      output.warnings.push(`Source unreachable: ${url}`);
      continue;
    }
    if (status >= 400) {
      output.warnings.push(`Source returned ${status}: ${url}`);
    }
  }

  return output;
}

async function probeUrl(url: string) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8_000);

  try {
    const head = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": "SpendAgentValidator/0.1 (+public-spending-transparency; non-aggressive)",
      },
    });

    if (head.status !== 405 && head.status !== 403) {
      return head.status;
    }

    const get = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": "SpendAgentValidator/0.1 (+public-spending-transparency; non-aggressive)",
      },
    });
    return get.status;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}
