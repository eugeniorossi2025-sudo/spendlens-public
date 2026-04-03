import { countBySeverity, formatCurrency, totalsSnapshot } from "@/lib/status";

export function SummaryCards() {
  const severity = countBySeverity();
  const totals = totalsSnapshot();

  const cards = [
    {
      title: "Projects monitored",
      value: "6",
      note: `${severity.red} critical · ${severity.yellow} attention`,
    },
    {
      title: "Planned public budget",
      value: formatCurrency(totals.planned),
      note: "Budget baseline across the current portfolio",
    },
    {
      title: "Declared actual cost",
      value: formatCurrency(totals.actual),
      note: "Published actuals only, excluding missing updates",
    },
    {
      title: "Methodology confidence",
      value: "High",
      note: "Traffic-light rules and data coverage disclosed openly",
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
