import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { lookup } from "node:dns/promises";
import { projects } from "../src/data/projects";
import { evaluateProject, formatCurrency, totalsSnapshot } from "../src/lib/status";

const LIVE_BASE_URL = "https://public-spending-mvp.vercel.app";
const REPORT_DIR = path.join(process.cwd(), "docs", "spendagent", "reports");
const today = new Date().toISOString().slice(0, 10);

async function main() {
const routeStatuses = await checkRoutes([
  "/",
  "/dashboard",
  "/methodology",
  "/sources",
  "/policy",
]);

const dnsRecords = await resolveLiveHost();
const severity = projects.reduce(
  (acc, project) => {
    acc[evaluateProject(project).overall] += 1;
    return acc;
  },
  { green: 0, yellow: 0, red: 0 },
);
const latestProjects = [...projects]
  .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
  .slice(0, 5);
const sourceUrls = new Set(projects.flatMap((project) => project.sources.map((source) => source.url).filter(Boolean)));
const missingFacts = projects.reduce((sum, project) => sum + project.missingFacts.length, 0);
const concessionCount = projects.filter((project) => project.valueKind === "concession-estimate").length;
const totals = totalsSnapshot();

const report = renderReport();

await mkdir(REPORT_DIR, { recursive: true });
await writeFile(path.join(REPORT_DIR, `${today}.md`), report, "utf8");
await writeFile(path.join(REPORT_DIR, "latest.md"), report, "utf8");

console.log(`[spendagent] wrote ${path.join(REPORT_DIR, `${today}.md`)}`);

function renderReport() {
  const statusRows = routeStatuses
    .map((route) => `| \`${route.path}\` | ${route.status ?? "FAIL"} | ${route.ok ? "OK" : "CHECK"} |`)
    .join("\n");
  const latestRows = latestProjects
    .map((project) => `| \`${project.code}\` | ${escapeCell(project.title)} | ${project.updatedAt} | ${project.valueKind} |`)
    .join("\n");
  const ipList = dnsRecords.length > 0 ? dnsRecords.map((record) => `\`${record}\``).join(", ") : "non disponibile";
  const verdict = routeStatuses.every((route) => route.ok) ? "PRONTA PER APPROVAZIONE UMANA" : "RICHIEDE CONTROLLO";

  return `# SpendAgent Daily Report - ${today}

## Sintesi

| Voce | Valore |
|------|--------|
| Prodotto | SpendLens |
| Live | ${LIVE_BASE_URL} |
| Branch produzione | \`main\` |
| Dossier totali | ${projects.length} |
| Dossier critici | ${severity.red} |
| Dossier da attenzionare | ${severity.yellow} |
| Dossier verdi | ${severity.green} |
| Fonti con URL | ${sourceUrls.size} |
| Missing facts dichiarati | ${missingFacts} |
| Concessioni qualificate | ${concessionCount} |
| Totale pianificato | ${formatCurrency(totals.planned)} |
| Totale valori affidamento/spesa diretta | ${formatCurrency(totals.actual)} |
| DNS/IP live | ${ipList} |

## Rotte Live

| Route | Status | Esito |
|------|--------|-------|
${statusRows}

## Ultimi Dossier Pubblicati

| Codice | Dossier | Aggiornamento | Tipo valore |
|--------|---------|---------------|-------------|
${latestRows}

## Approvazione

Per pubblicare dopo la revisione, commenta nella PR:

\`\`\`text
APPROVATO PUBBLICA
\`\`\`

Oppure avvia manualmente il workflow \`SpendAgent Publish Approved\` indicando il numero PR.

## Verdetto

**${verdict}**
`;
}

}

async function checkRoutes(paths: string[]) {
  const checks = [];
  for (const routePath of paths) {
    try {
      const response = await fetch(`${LIVE_BASE_URL}${routePath}`, { redirect: "follow" });
      checks.push({ path: routePath, status: response.status, ok: response.ok });
    } catch {
      checks.push({ path: routePath, status: null, ok: false });
    }
  }
  return checks;
}

async function resolveLiveHost() {
  try {
    const records = await lookup(new URL(LIVE_BASE_URL).hostname, { all: true });
    return records.map((record) => record.address);
  } catch {
    return [];
  }
}

function escapeCell(value: string) {
  return value.replace(/\|/g, "\\|").replace(/\n/g, " ");
}


main().catch((error) => {
  console.error("[spendagent] report failed", error);
  process.exitCode = 1;
});
