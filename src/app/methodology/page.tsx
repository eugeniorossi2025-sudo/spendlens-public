export default function MethodologyPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <div className="eyebrow">Metodo</div>
        <h1 className="display-title text-slate-950">Regole semplici, pubblicate apertamente.</h1>
      </div>
      <div className="rounded-[28px] border border-white/60 bg-white/88 p-8 shadow-[0_20px_80px_rgba(10,37,64,0.10)] backdrop-blur">
        <div className="space-y-5 text-base leading-8 text-slate-700">
          <p>Questo progetto pilota usa tre segnali pubblici espliciti: costo, tempo e completezza dei dati.</p>
          <p>Il costo diventa rosso sopra il 20% rispetto al piano. Il tempo diventa rosso sopra il 30% di ritardo. Dati mancanti o incompleti producono giallo.</p>
          <p>Quando una fonte pubblica documenta che un servizio esiste ma non espone l&apos;intera catena contrattuale, il dossier resta giallo invece di inventare fatti mancanti.</p>
          <p>Ogni scheda mostra anche numero di fonti e data di aggiornamento, cosi l&apos;utente puo giudicare freschezza e copertura, non solo il punteggio.</p>
        </div>
      </div>
    </div>
  );
}
