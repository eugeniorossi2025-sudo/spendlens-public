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
          <div className="eyebrow">Concept</div>
          <h1 className="display-title max-w-5xl text-slate-950">A public spending platform built to make trust legible in under ten seconds.</h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-600">
            SpendLens turns public project delivery into a clear operating view: what is on track, what is slipping, and where the data is incomplete.
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
            <Metric label="Critical projects" value={String(severity.red)} note="Cost or time signal in red" />
            <Metric label="Attention required" value={String(severity.yellow)} note="Missing data or moderate drift" />
            <Metric label="Rules published" value="3" note="Cost, time, data completeness" />
          </div>
        </aside>
      </section>

      <SummaryCards />

      <section className="grid gap-6 lg:grid-cols-3">
        <article className="feature-card">
          <div className="eyebrow">Why users trust it</div>
          <h2 className="section-title mt-3 text-slate-950">The scoring is visible, not mysterious.</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Every traffic light is tied to a public rule. Users do not need to guess why a project is marked critical.
          </p>
        </article>
        <article className="feature-card">
          <div className="eyebrow">Why users stay</div>
          <h2 className="section-title mt-3 text-slate-950">The dashboard reduces noise.</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            It surfaces cost drift, delay drift, and data gaps first, before the user opens a single detail page.
          </p>
        </article>
        <article className="feature-card">
          <div className="eyebrow">Why users share</div>
          <h2 className="section-title mt-3 text-slate-950">It turns accountability into a screenshot.</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Clear signals, exact numbers, and public sources make it easy to share a project snapshot without added interpretation.
          </p>
        </article>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="eyebrow">Dashboard preview</div>
            <h2 className="section-title text-slate-950">A fast public register, already usable as an MVP.</h2>
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
