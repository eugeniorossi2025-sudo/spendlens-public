import { ProjectTable } from "@/components/project-table";
import { SummaryCards } from "@/components/summary-cards";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="eyebrow">Dashboard pubblica</div>
            <h1 className="display-title max-w-3xl text-slate-950">Piacenza, ridotta a cio che oggi e&apos; davvero pubblico nei settori piu strategici.</h1>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-600">
            I semafori sono generati da regole esplicite: oltre il 20% di extra-costo e&apos; rosso, oltre il 30% di ritardo e&apos; rosso, dati mancanti o parziali sono gialli. Sono indicatori informativi, non accertamenti di illecito.
          </p>
        </div>
        <div className="rounded-[24px] border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-7 text-amber-900">
          In questa pubblicazione convivono dossier forti e dossier parziali: quando esiste una procedura ufficiale con esito o pubblicazione legale la scheda viene rinforzata; quando le fonti sono solo parziali, il limite viene dichiarato apertamente.
        </div>
        <SummaryCards />
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="eyebrow">Registro pubblico</div>
            <h2 className="section-title text-slate-950">Dossier documentati per il controllo pubblico</h2>
          </div>
        </div>
        <ProjectTable />
      </section>
    </div>
  );
}
