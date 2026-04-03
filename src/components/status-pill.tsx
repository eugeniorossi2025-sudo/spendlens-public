import type { Severity } from "@/lib/status";

const classes: Record<Severity, string> = {
  green: "bg-emerald-100 text-emerald-900 ring-emerald-200",
  yellow: "bg-amber-100 text-amber-950 ring-amber-200",
  red: "bg-rose-100 text-rose-950 ring-rose-200",
};

const labels: Record<Severity, string> = {
  green: "On track",
  yellow: "Attention",
  red: "Critical",
};

export function StatusPill({ tone, label }: { tone: Severity; label?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${classes[tone]}`}>
      <span className="h-2 w-2 rounded-full bg-current" />
      {label ?? labels[tone]}
    </span>
  );
}
