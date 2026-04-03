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
          <div className="eyebrow">Progetto pilota Piacenza</div>
          <h1 className="display-title max-w-5xl text-slate-950">Appalti seri di Piacenza: quelli con piu soldi e con piu tracce pubbliche.</h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-600">
            Questo progetto pilota italiano segue documenti ufficiali del Comune di Piacenza e mette davanti i dossier con piu peso economico e piu rilevanza strategica. L&apos;obiettivo e&apos; semplice: mostrare dove passano i soldi grossi, cosa e&apos; documentato e dove mancano ancora pezzi decisivi.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard" className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-800">
              Apri dashboard
            </Link>
            <Link href="/methodology" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:border-slate-950">
              Leggi il metodo
            </Link>
          </div>
        </div>

        <aside className="rounded-[32px] border border-white/60 bg-slate-950 p-8 text-white shadow-[0_24px_80px_rgba(10,37,64,0.20)]">
          <div className="eyebrow text-white/60">Quadro fiducia</div>
          <div className="mt-5 space-y-5">
            <Metric label="Dossier critici" value={String(severity.red)} note="Nessun segnale rosso nel pilot attuale" />
            <Metric label="Da attenzionare" value={String(severity.yellow)} note="Dati pubblici incompleti, parziali o non comparabili" />
            <Metric label="Soldi grossi tracciati" value="100M+" note="Concessioni e affidamenti con massa economica visibile" />
          </div>
        </aside>
      </section>

      <SummaryCards />

      <section className="grid gap-6 lg:grid-cols-3">
        <article className="feature-card">
          <div className="eyebrow">Perche fidarsi</div>
          <h2 className="section-title mt-3 text-slate-950">Il punteggio e&apos; esplicito, non retorico.</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Ogni semaforo e&apos; legato a una regola pubblica. Il giallo spesso indica trasparenza incompleta, non irregolarita.
          </p>
        </article>
        <article className="feature-card">
          <div className="eyebrow">Perche resta utile</div>
          <h2 className="section-title mt-3 text-slate-950">La dashboard riduce il rischio fattuale e legale.</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Separa i fatti documentati dall&apos;interpretazione e mantiene le affermazioni piu strette delle prove disponibili.
          </p>
        </article>
        <article className="feature-card">
          <div className="eyebrow">Perche si condivide</div>
          <h2 className="section-title mt-3 text-slate-950">Trasforma atti pubblici in una scheda leggibile.</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Segnali chiari, numeri esatti dove disponibili e linguaggio prudente rendono il dossier condivisibile senza forzature.
          </p>
        </article>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="eyebrow">Anteprima dashboard</div>
            <h2 className="section-title text-slate-950">Un registro che parte dai dossier economicamente piu pesanti.</h2>
          </div>
          <Link href="/dashboard" className="text-sm font-semibold text-teal-800 hover:text-teal-950">
            Vai alla dashboard completa
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
