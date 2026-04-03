import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/data/projects";
import { StatusPill } from "@/components/status-pill";
import { evaluateProject, formatCurrency, formatPercent } from "@/lib/status";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const health = evaluateProject(project);

  const stats = [
    { label: "Planned cost", value: formatCurrency(project.budgetPlanned) },
    { label: "Actual cost", value: formatCurrency(project.budgetActual) },
    { label: "Cost variance", value: formatPercent(health.costDeltaPct) },
    { label: "Planned time", value: `${project.timelinePlannedDays} days` },
    { label: "Actual time", value: project.timelineActualDays === null ? "Data pending" : `${project.timelineActualDays} days` },
    { label: "Time variance", value: formatPercent(health.timeDeltaPct) },
    { label: "Completion", value: `${project.completionPct}%` },
    { label: "Sources", value: `${project.sourceCount} verified sources` },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link href="/dashboard" className="text-sm font-medium text-teal-800 hover:text-teal-950">
          Back to dashboard
        </Link>
        <StatusPill tone={health.overall} />
      </div>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
        <article className="rounded-[32px] border border-white/60 bg-white/88 p-8 shadow-[0_20px_80px_rgba(10,37,64,0.10)] backdrop-blur">
          <div className="eyebrow">{project.code} · {project.sector}</div>
          <h1 className="display-title mt-3 text-slate-950">{project.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{project.summary}</p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Info label="Authority" value={project.authority} />
            <Info label="Location" value={project.location} />
            <Info label="Contractor" value={project.contractor} />
            <Info label="Procurement" value={project.procurementMethod} />
            <Info label="Stage" value={project.statusLabel} />
            <Info label="Last update" value={project.updatedAt} />
          </div>
        </article>

        <aside className="rounded-[32px] border border-white/60 bg-slate-950 p-8 text-white shadow-[0_20px_80px_rgba(10,37,64,0.16)]">
          <div className="eyebrow text-white/60">Project health</div>
          <div className="mt-4 flex flex-wrap gap-3">
            <StatusPill tone={health.cost} label="Cost" />
            <StatusPill tone={health.time} label="Time" />
            <StatusPill tone={health.data} label="Data" />
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-[0.16em] text-white/55">{stat.label}</div>
                <div className="mt-2 text-xl font-semibold tracking-[-0.03em] text-white">{stat.value}</div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="rounded-[32px] border border-white/60 bg-white/88 p-8 shadow-[0_20px_80px_rgba(10,37,64,0.10)] backdrop-blur">
        <div className="eyebrow">Timeline</div>
        <h2 className="section-title mt-3 text-slate-950">Audit trail</h2>
        <div className="mt-8 space-y-5">
          {project.milestones.map((item) => (
            <div key={`${project.slug}-${item.date}-${item.label}`} className="grid gap-3 rounded-[22px] border border-slate-200/80 bg-slate-50/80 p-5 md:grid-cols-[140px_minmax(0,1fr)]">
              <div className="text-sm font-semibold text-slate-950">{item.date}</div>
              <div>
                <div className="text-base font-semibold text-slate-950">{item.label}</div>
                <div className="mt-1 text-sm leading-7 text-slate-600">{item.note}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[22px] border border-slate-200/80 bg-slate-50/80 p-5">
      <div className="text-xs uppercase tracking-[0.16em] text-slate-500">{label}</div>
      <div className="mt-2 text-base font-semibold text-slate-950">{value}</div>
    </div>
  );
}
