import Link from "next/link";
import { ProjectTable } from "@/components/project-table";
import { SummaryCards } from "@/components/summary-cards";
import { countBySeverity } from "@/lib/status";

export default function Home() {
  const severity = countBySeverity();

  return (
    <div className="space-y-12">
      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_420px] lg:items-end">
        <div className="space-y-6">
          <div className="eyebrow">Piacenza Pilot</div>
          <h1 className="display-title max-w-5xl text-slate-950">Three school-service dossiers, reduced to clear public signals.</h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-600">
            This first Italian pilot tracks official Comune di Piacenza school-service records. The goal is simple: show what is documented, what is missing, and where citizens should ask for fuller disclosure.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard" className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-800">
              Open dashboard
            </Link>
            <Link href="/methodology" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:border-slate-950">
              Read methodology
            </Link>
          </div>
        </div>

        <aside className="rounded-[32px] border border-white/60 bg-slate-950 p-8 text-white shadow-[0_24px_80px_rgba(10,37,64,0.20)]">
          <div className="eyebrow text-white/60">Trust panel</div>
          <div className="mt-5 space-y-5">
            <Metric label="Critical dossiers" value={String(severity.red)} note="No red signal in the current pilot" />
            <Metric label="Attention required" value={String(severity.yellow)} note="Public data incomplete or partial" />
            <Metric label="Rules published" value="3" note="Cost, time, data completeness" />
          </div>
        </aside>
      </section>

      <SummaryCards />

      <section className="grid gap-6 lg:grid-cols-3">
        <article className="feature-card">
          <div className="eyebrow">Why users trust it</div>
          <h2 className="section-title mt-3 text-slate-950">The scoring is explicit, not rhetorical.</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Every traffic light is tied to a public rule. Yellow often means incomplete disclosure, not wrongdoing.
          </p>
        </article>
        <article className="feature-card">
          <div className="eyebrow">Why users stay</div>
          <h2 className="section-title mt-3 text-slate-950">The dashboard reduces legal and factual risk.</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            It separates sourced facts from interpretation and keeps claims narrower than the evidence.
          </p>
        </article>
        <article className="feature-card">
          <div className="eyebrow">Why users share</div>
          <h2 className="section-title mt-3 text-slate-950">It turns public records into a readable snapshot.</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Clear signals, exact numbers where available, and cautious wording make the dossier easy to circulate without overclaiming.
          </p>
        </article>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="eyebrow">Dashboard preview</div>
            <h2 className="section-title text-slate-950">A first public register for Piacenza school services.</h2>
          </div>
          <Link href="/dashboard" className="text-sm font-semibold text-teal-800 hover:text-teal-950">
            View full dashboard
          </Link>
        </div>
        <ProjectTable compact />
      </section>
    </div>
  );
}

function Metric({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/6 p-5">
      <div className="text-xs uppercase tracking-[0.16em] text-white/55">{label}</div>
      <div className="mt-2 text-4xl font-semibold tracking-[-0.05em] text-white">{value}</div>
      <div className="mt-2 text-sm leading-6 text-white/70">{note}</div>
    </div>
  );
}
