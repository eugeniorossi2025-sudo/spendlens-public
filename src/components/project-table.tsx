import Link from "next/link";
import { projects } from "@/data/projects";
import { evaluateProject, formatCurrency, formatPercent } from "@/lib/status";
import { StatusPill } from "@/components/status-pill";

export function ProjectTable({ compact = false }: { compact?: boolean }) {
  const rows = compact ? projects.slice(0, 4) : projects;

  return (
    <div className="overflow-hidden rounded-[28px] border border-white/60 bg-white/88 shadow-[0_20px_80px_rgba(10,37,64,0.10)] backdrop-blur">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200/80 text-xs uppercase tracking-[0.16em] text-slate-500">
              <th className="px-6 py-4 font-medium">Project</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Cost</th>
              <th className="px-6 py-4 font-medium">Time</th>
              <th className="px-6 py-4 font-medium">Data</th>
              <th className="px-6 py-4 font-medium">Updated</th>
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
                    </div>
                  </td>
                  <td className="px-6 py-5"><StatusPill tone={health.overall} /></td>
                  <td className="px-6 py-5 text-sm text-slate-700">
                    <div className="font-medium text-slate-950">{formatCurrency(project.budgetActual)}</div>
                    <div>{formatPercent(health.costDeltaPct)} vs plan</div>
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-700">
                    <div className="font-medium text-slate-950">
                      {project.timelineActualDays === null ? "Data pending" : `${project.timelineActualDays} d`}
                    </div>
                    <div>{formatPercent(health.timeDeltaPct)} vs plan</div>
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-700">
                    <div className="font-medium text-slate-950">{project.dataCoveragePct}% complete</div>
                    <div>{project.sourceCount} sources</div>
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
