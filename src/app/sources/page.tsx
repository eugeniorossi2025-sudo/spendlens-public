import Link from "next/link";
import { projects } from "@/data/projects";

export default function SourcesPage() {
  return (
    <div className="space-y-6">
      <div className="max-w-4xl">
        <div className="eyebrow">Fonti</div>
        <h1 className="display-title text-slate-950">La provenienza dei dati fa parte del prodotto.</h1>
        <p className="mt-4 text-base leading-8 text-slate-600">
          I link ufficiali non sono un elemento decorativo: ogni dossier pubblicato deve poter ricondurre il lettore alla pagina pubblica o alla pubblicazione legale usata come base fattuale.
        </p>
      </div>

      <div className="rounded-[28px] border border-white/60 bg-white/88 p-8 shadow-[0_20px_80px_rgba(10,37,64,0.10)] backdrop-blur">
        <div className="text-sm leading-7 text-slate-700">
          Le fonti usate nel pilot provengono soprattutto da portale appalti del Comune di Piacenza, pubblicazioni ANAC, TED e pagine istituzionali di servizio. Sotto trovi l&apos;indice completo, dossier per dossier.
        </div>
      </div>

      <div className="grid gap-5">
        {projects.map((project) => {
          const linkedSources = project.sources.filter((source) => source.url);

          return (
            <section key={project.slug} className="rounded-[28px] border border-white/60 bg-white/88 p-6 shadow-[0_20px_80px_rgba(10,37,64,0.10)] backdrop-blur">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">{project.code}</div>
                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-950">{project.title}</h2>
                  <div className="mt-2 text-sm leading-7 text-slate-600">{project.authority} · {project.location} · {linkedSources.length} link ufficiali visibili</div>
                </div>
                <Link href={`/projects/${project.slug}`} className="text-sm font-semibold text-teal-800 hover:text-teal-950">
                  Apri il dossier completo
                </Link>
              </div>

              <div className="mt-5 space-y-4">
                {linkedSources.length > 0 ? linkedSources.map((source) => (
                  <div key={`${project.slug}-${source.label}`} className="rounded-[22px] border border-slate-200/80 bg-slate-50/80 p-5">
                    <div className="text-base font-semibold text-slate-950">{source.label}</div>
                    <a href={source.url} target="_blank" rel="noreferrer" className="mt-2 block break-all text-sm font-medium text-teal-800 hover:text-teal-950">
                      {source.url}
                    </a>
                    <div className="mt-2 text-sm leading-7 text-slate-600">{source.note}</div>
                  </div>
                )) : (
                  <div className="rounded-[22px] border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-900">
                    Questo dossier non ha ancora URL ufficiali pubblicati in pagina: resta visibile solo la nota documentale interna al dossier.
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
