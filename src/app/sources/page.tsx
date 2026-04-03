export default function SourcesPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <div className="eyebrow">Sources</div>
        <h1 className="display-title text-slate-950">Data provenance is part of the product.</h1>
      </div>
      <div className="rounded-[28px] border border-white/60 bg-white/88 p-8 shadow-[0_20px_80px_rgba(10,37,64,0.10)] backdrop-blur">
        <ul className="space-y-4 text-base leading-8 text-slate-700">
          <li>Official Comune di Piacenza service pages</li>
          <li>Public procurement dossiers published through the Comune procurement portal</li>
          <li>Service regulations, operational sheets and framework references published by the administration</li>
          <li>Direct document extraction from official public PDFs when portal pages expose only partial metadata</li>
        </ul>
      </div>
    </div>
  );
}
