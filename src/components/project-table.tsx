import Link from "next/link";
import { projects } from "@/data/projects";
import { evaluateProject, formatCurrency, formatPercent } from "@/lib/status";
import { StatusPill } from "@/components/status-pill";

export function ProjectTable({ compact = false }: { compact?: boolean }) {
  const rows = [...projects]
    .sort((left, right) => dossierWeight(right) - dossierWeight(left))
    .slice(0, compact ? 6 : projects.length);

  return (
    <div className="overflow-hidden rounded-[28px] border border-white/60 bg-white/88 shadow-[0_20px_80px_rgba(10,37,64,0.10)] backdrop-blur">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200/80 text-xs uppercase tracking-[0.16em] text-slate-500">
              <th className="px-6 py-4 font-medium">Dossier</th>
              <th className="px-6 py-4 font-medium">Stato</th>
              <th className="px-6 py-4 font-medium">Costo</th>
              <th className="px-6 py-4 font-medium">Tempo</th>
              <th className="px-6 py-4 font-medium">Dati</th>
              <th className="px-6 py-4 font-medium">Aggiornato</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((project) => {
              const health = evaluateProject(project);
              return (
                <tr key={project.slug} className="border-b border-slate-200/70 align-top last:border-b-0">
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-2">
                      <div className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">{project.code}</div>
                      <Link href={`/projects/${project.slug}`} className="text-base font-semibold text-slate-950 hover:text-teal-800">
                        {project.title}
                      </Link>
                      <div className="text-sm text-slate-600">{project.location} · {project.authority}</div>
                      {dossierWeight(project) >= 1_000_000 ? (
                        <div className="inline-flex w-fit items-center rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-rose-800">
                          {project.valueKind === "concession-estimate" ? "Concessione ad alto valore" : "Appalto ad alto valore"}
                        </div>
                      ) : null}
                      <div className={`text-xs font-medium ${project.dossierStrength === "strong" ? "text-teal-700" : "text-amber-700"}`}>
                        {project.dossierNote}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5"><StatusPill tone={health.overall} /></td>
                  <td className="px-6 py-5 text-sm text-slate-700">
                    <div className="font-medium text-slate-950">{renderPrimaryValue(project)}</div>
                    <div>{renderSecondaryValue(project, health.costDeltaPct)}</div>
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-700">
                    <div className="font-medium text-slate-950">
                      {project.timelineActualDays === null ? (project.timelinePlannedDays === null ? "Durata non pubblicata" : `Pianificato ${project.timelinePlannedDays} giorni`) : `${project.timelineActualDays} giorni`}
                    </div>
                    <div>{health.timeDeltaPct === null ? (project.timelineActualDays === null ? "Consuntivo tempi non pubblicato" : "Scostamento non calcolabile") : `${formatPercent(health.timeDeltaPct)} rispetto al piano`}</div>
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-700">
                    <div className="font-medium text-slate-950">{project.dataCoveragePct}% coperto</div>
                    <div>{project.sourceCount} fonti · {project.dossierStrength === "strong" ? "dossier forte" : "dossier parziale"}</div>
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-700">{project.updatedAt}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function dossierWeight(project: (typeof projects)[number]) {
  return Math.max(project.budgetActual ?? 0, project.budgetPlanned ?? 0);
}

function renderPrimaryValue(project: (typeof projects)[number]) {
  if (project.valueKind === "concession-estimate") {
    return `Concessione stimata ${formatCurrency(Math.max(project.budgetActual ?? 0, project.budgetPlanned ?? 0))}`;
  }

  if (project.budgetActual !== null) {
    return formatCurrency(project.budgetActual);
  }

  if (project.budgetPlanned !== null) {
    return `Pianificato ${formatCurrency(project.budgetPlanned)}`;
  }

  return "Valore non pubblicato";
}

function renderSecondaryValue(project: (typeof projects)[number], costDeltaPct: number | null) {
  if (project.valueKind === "concession-estimate") {
    return project.valueNote;
  }

  if (costDeltaPct === null) {
    return project.budgetActual === null ? "Consuntivo economico non pubblicato" : "Scostamento non calcolabile";
  }

  return `${formatPercent(costDeltaPct)} rispetto al piano`;
}
