export default function PolicyPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <div className="eyebrow">Policy</div>
        <h1 className="display-title text-slate-950">Neutral by design.</h1>
      </div>
      <div className="rounded-[28px] border border-white/60 bg-white/88 p-8 shadow-[0_20px_80px_rgba(10,37,64,0.10)] backdrop-blur">
        <div className="space-y-5 text-base leading-8 text-slate-700">
          <p>This MVP is structured as a non-partisan public information layer. It prioritises legibility, source disclosure and replicable scoring.</p>
          <p>No political messaging, endorsements or editorial ranking are included. The interface exists to help citizens inspect delivery risk quickly.</p>
        </div>
      </div>
    </div>
  );
}
