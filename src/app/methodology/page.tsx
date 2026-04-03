export default function MethodologyPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <div className="eyebrow">Methodology</div>
        <h1 className="display-title text-slate-950">Simple rules, published openly.</h1>
      </div>
      <div className="rounded-[28px] border border-white/60 bg-white/88 p-8 shadow-[0_20px_80px_rgba(10,37,64,0.10)] backdrop-blur">
        <div className="space-y-5 text-base leading-8 text-slate-700">
          <p>This pilot uses three explicit public signals: cost, time and data completeness.</p>
          <p>Cost turns red above 20% over plan. Time turns red above 30% delay over plan. Missing or incomplete data turns yellow.</p>
          <p>When a public source documents that a service exists but does not expose the full contract chain, the dossier stays yellow rather than inferring missing facts.</p>
          <p>Every card also shows source count and update date so users can judge freshness and coverage, not just score.</p>
        </div>
      </div>
    </div>
  );
}
