import { ProjectTable } from "@/components/project-table";
import { SummaryCards } from "@/components/summary-cards";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="eyebrow">Live dashboard</div>
            <h1 className="display-title max-w-3xl text-slate-950">Piacenza school services, reduced to what is actually public.</h1>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-600">
            Traffic lights are generated from explicit rules: cost overruns above 20% are red, delays above 30% are red, and missing or partial data is yellow. These are informational indicators, not findings of illegality.
          </p>
        </div>
        <SummaryCards />
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="eyebrow">Public register</div>
            <h2 className="section-title text-slate-950">Three documented dossiers for public scrutiny</h2>
          </div>
        </div>
        <ProjectTable />
      </section>
    </div>
  );
}
