import Link from "next/link";
import { projects } from "@/data/projects";
import { evaluateProject, formatCurrency, formatPercent } from "@/lib/status";
import { StatusPill } from "@/components/status-pill";

export function ProjectTable({ compact = false }: { compact?: boolean }) {
  const rows = compact ? projects.slice(0, 6) : projects;

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
                      <div className={`text-xs font-medium ${project.dossierStrength === "strong" ? "text-teal-700" : "text-amber-700"}`}>
                        {project.dossierNote}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5"><StatusPill tone={health.overall} /></td>
                  <td className="px-6 py-5 text-sm text-slate-700">
                    <div className="font-medium text-slate-950">{project.budgetActual === null ? (project.budgetPlanned === null ? "Valore non pubblicato" : `Pianificato ${formatCurrency(project.budgetPlanned)}`) : formatCurrency(project.budgetActual)}</div>
                    <div>{health.costDeltaPct === null ? (project.budgetActual === null ? "Consuntivo economico non pubblicato" : "Scostamento non calcolabile") : `${formatPercent(health.costDeltaPct)} rispetto al piano`}</div>
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
