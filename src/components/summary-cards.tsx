import { projects } from "@/data/projects";
import { countBySeverity, formatCurrency, totalsSnapshot } from "@/lib/status";

export function SummaryCards() {
  const severity = countBySeverity();
  const totals = totalsSnapshot();
  const strongDossiers = projects.filter((project) => project.dossierStrength === "strong").length;
  const partialDossiers = projects.filter((project) => project.dossierStrength === "partial").length;

  const cards = [
    {
      title: "Dossier monitorati",
      value: String(projects.length),
      note: `${strongDossiers} forti · ${partialDossiers} parziali · ${severity.yellow} da attenzionare`,
    },
    {
      title: "Budget pubblico pianificato",
      value: formatCurrency(totals.planned),
      note: "Somma degli importi pianificati oggi pubblicamente visibili",
    },
    {
      title: "Costo effettivo dichiarato",
      value: formatCurrency(totals.actual),
      note: "Solo valori pubblicati, esclusi gli aggiornamenti mancanti",
    },
    {
      title: "Affidabilità metodo",
      value: "Alta",
      note: "Regole semaforiche, forza del dossier e buchi documentali dichiarati apertamente",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <article key={card.title} className="rounded-[24px] border border-white/60 bg-white/88 p-5 shadow-[0_12px_40px_rgba(10,37,64,0.08)] backdrop-blur">
          <div className="text-xs uppercase tracking-[0.14em] text-slate-500">{card.title}</div>
          <div className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">{card.value}</div>
          <div className="mt-2 text-sm leading-6 text-slate-600">{card.note}</div>
        </article>
      ))}
    </div>
  );
}
