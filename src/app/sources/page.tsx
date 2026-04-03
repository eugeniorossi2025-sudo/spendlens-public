export default function SourcesPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <div className="eyebrow">Sources</div>
        <h1 className="display-title text-slate-950">Data provenance is part of the product.</h1>
      </div>
      <div className="rounded-[28px] border border-white/60 bg-white/88 p-8 shadow-[0_20px_80px_rgba(10,37,64,0.10)] backdrop-blur">
        <ul className="space-y-4 text-base leading-8 text-slate-700">
          <li>Procurement notices and award registers</li>
          <li>Budget and programme monitoring publications</li>
          <li>Project progress bulletins and official updates</li>
          <li>Open data files and machine-readable exports</li>
        </ul>
      </div>
    </div>
  );
}
