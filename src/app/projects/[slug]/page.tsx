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
    { label: "Costo pianificato", value: formatCurrency(project.budgetPlanned) },
    { label: "Costo effettivo", value: formatCurrency(project.budgetActual) },
    { label: "Scostamento costo", value: formatPercent(health.costDeltaPct) },
    { label: "Tempo pianificato", value: project.timelinePlannedDays === null ? "Dati non disponibili" : `${project.timelinePlannedDays} giorni` },
    { label: "Tempo effettivo", value: project.timelineActualDays === null ? "Dati non disponibili" : `${project.timelineActualDays} giorni` },
    { label: "Scostamento tempo", value: formatPercent(health.timeDeltaPct) },
    { label: "Completamento", value: `${project.completionPct}%` },
    { label: "Fonti", value: `${project.sourceCount} fonti verificate` },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link href="/dashboard" className="text-sm font-medium text-teal-800 hover:text-teal-950">
          Torna alla dashboard
        </Link>
        <StatusPill tone={health.overall} />
      </div>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
        <article className="rounded-[32px] border border-white/60 bg-white/88 p-8 shadow-[0_20px_80px_rgba(10,37,64,0.10)] backdrop-blur">
          <div className="eyebrow">{project.code} · {project.sector}</div>
          <h1 className="display-title mt-3 text-slate-950">{project.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{project.summary}</p>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-500">
            Questa scheda e&apos; un dossier informativo pubblico. Il suo semaforo e&apos; un indicatore editoriale basato su atti pubblicati esaminati da SpendLens e non costituisce un&apos;accusa o una valutazione legale.
          </p>
          <div className={`mt-5 rounded-[22px] px-4 py-3 text-sm leading-7 ${project.dossierStrength === "strong" ? "border border-teal-200 bg-teal-50 text-teal-900" : "border border-amber-200 bg-amber-50 text-amber-900"}`}>
            {project.dossierNote}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Info label="Ente" value={project.authority} />
            <Info label="Luogo" value={project.location} />
            <Info label="Operatore" value={project.contractor} />
            <Info label="Procedura" value={project.procurementMethod} />
            <Info label="Stato" value={project.statusLabel} />
            <Info label="Ultimo aggiornamento" value={project.updatedAt} />
          </div>
        </article>

        <aside className="rounded-[32px] border border-white/60 bg-slate-950 p-8 text-white shadow-[0_20px_80px_rgba(10,37,64,0.16)]">
          <div className="eyebrow text-white/60">Salute del dossier</div>
          <div className="mt-4 flex flex-wrap gap-3">
            <StatusPill tone={health.cost} label="Costo" />
            <StatusPill tone={health.time} label="Tempo" />
            <StatusPill tone={health.data} label="Dati" />
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
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <div className="eyebrow">Evidenze</div>
            <h2 className="section-title mt-3 text-slate-950">Cosa sappiamo davvero</h2>
            <div className="mt-6 space-y-4">
              {project.evidence.map((item) => (
                <div key={`${project.slug}-evidence-${item.label}`} className="rounded-[22px] border border-slate-200/80 bg-slate-50/80 p-5">
                  <div className="text-xs uppercase tracking-[0.16em] text-slate-500">{item.label}</div>
                  <div className="mt-2 text-base font-semibold text-slate-950">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="eyebrow">Buchi documentali</div>
            <h2 className="section-title mt-3 text-slate-950">Cosa manca ancora</h2>
            <div className="mt-6 space-y-3">
              {project.missingFacts.map((item) => (
                <div key={`${project.slug}-missing-${item}`} className="rounded-[22px] border border-slate-200/80 bg-slate-50/80 p-5 text-sm leading-7 text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[32px] border border-white/60 bg-white/88 p-8 shadow-[0_20px_80px_rgba(10,37,64,0.10)] backdrop-blur">
        <div className="eyebrow">Fonti pubbliche</div>
        <h2 className="section-title mt-3 text-slate-950">Link e riferimenti usati nel dossier</h2>
        <div className="mt-8 space-y-4">
          {project.sources.map((source) => (
            <div key={`${project.slug}-source-${source.label}`} className="rounded-[22px] border border-slate-200/80 bg-slate-50/80 p-5">
              <div className="text-base font-semibold text-slate-950">{source.label}</div>
              {source.url ? (
                <a href={source.url} target="_blank" rel="noreferrer" className="mt-2 block break-all text-sm font-medium text-teal-800 hover:text-teal-950">
                  {source.url}
                </a>
              ) : null}
              <div className="mt-2 text-sm leading-7 text-slate-600">{source.note}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[32px] border border-white/60 bg-white/88 p-8 shadow-[0_20px_80px_rgba(10,37,64,0.10)] backdrop-blur">
        <div className="eyebrow">Cronologia</div>
        <h2 className="section-title mt-3 text-slate-950">Traccia documentale</h2>
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
