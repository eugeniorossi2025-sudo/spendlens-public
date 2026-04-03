export default function SourcesPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <div className="eyebrow">Fonti</div>
        <h1 className="display-title text-slate-950">La provenienza dei dati fa parte del prodotto.</h1>
      </div>
      <div className="rounded-[28px] border border-white/60 bg-white/88 p-8 shadow-[0_20px_80px_rgba(10,37,64,0.10)] backdrop-blur">
        <ul className="space-y-4 text-base leading-8 text-slate-700">
          <li>Pagine ufficiali dei servizi del Comune di Piacenza</li>
          <li>Dossier di gara pubblicati tramite il portale appalti del Comune</li>
          <li>Regolamenti di servizio, fogli operativi e riferimenti di cornice pubblicati dall&apos;amministrazione</li>
          <li>Estrazione diretta di contenuti da PDF ufficiali quando le pagine portale espongono solo metadati parziali</li>
        </ul>
      </div>
    </div>
  );
}
