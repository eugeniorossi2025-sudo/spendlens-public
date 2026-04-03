import { projects } from "@/data/projects";
import { countBySeverity, formatCurrency, totalsSnapshot } from "@/lib/status";

export function SummaryCards() {
  const severity = countBySeverity();
  const totals = totalsSnapshot();
  const strongDossiers = projects.filter((project) => project.dossierStrength === "strong").length;
  const partialDossiers = projects.filter((project) => project.dossierStrength === "partial").length;
  const topDossier = [...projects].sort((left, right) => dossierWeight(right) - dossierWeight(left))[0];
  const highValueDossiers = projects.filter((project) => dossierWeight(project) >= 1_000_000).length;

  const cards = [
    {
      title: "Dossier monitorati",
      value: String(projects.length),
      note: `${strongDossiers} forti · ${partialDossiers} parziali · ${severity.yellow} da attenzionare`,
    },
    {
      title: "Dossier ad alto valore",
      value: String(highValueDossiers),
      note: "Procedure con valore economico visibile pari o superiore a 1 milione di euro, incluse concessioni stimate",
    },
    {
      title: "Valore economico piu alto",
      value: topDossier ? formatCurrency(dossierWeight(topDossier)) : "Dati non disponibili",
      note: topDossier ? `${topDossier.title} · ${topDossier.valueNote}` : "Nessun dossier con valore economico visibile",
    },
    {
      title: "Spesa pubblica comparabile",
      value: formatCurrency(Math.max(totals.planned, totals.actual)),
      note: "Somma tra importi pianificati e valori di affidamento pubblicati, esclusi i valori stimati di concessione",
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

function dossierWeight(project: (typeof projects)[number]) {
  return Math.max(project.budgetActual ?? 0, project.budgetPlanned ?? 0);
}
