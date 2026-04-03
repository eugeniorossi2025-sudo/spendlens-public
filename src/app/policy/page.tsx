export default function PolicyPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <div className="eyebrow">Regole</div>
        <h1 className="display-title text-slate-950">Neutrale per impostazione.</h1>
      </div>
      <div className="rounded-[28px] border border-white/60 bg-white/88 p-8 shadow-[0_20px_80px_rgba(10,37,64,0.10)] backdrop-blur">
        <div className="space-y-5 text-base leading-8 text-slate-700">
          <p>Questo MVP e&apos; strutturato come un livello informativo pubblico non partigiano. Prioritizza leggibilita, trasparenza delle fonti e punteggi replicabili.</p>
          <p>I semafori sono indicatori informativi basati su materiale pubblico esaminato. Non sono accuse, sanzioni o accertamenti di illegittimita.</p>
          <p>Non contiene messaggi politici, endorsement o classifiche personali. L&apos;interfaccia serve ad aiutare i cittadini a valutare rapidamente qualita della trasparenza e rischio di esecuzione.</p>
        </div>
      </div>
    </div>
  );
}
