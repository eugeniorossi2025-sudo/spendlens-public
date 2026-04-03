export type ProjectTimelineEvent = {
  date: string;
  label: string;
  note: string;
};

export type SpendingProject = {
  slug: string;
  code: string;
  title: string;
  authority: string;
  location: string;
  sector: string;
  contractor: string;
  procurementMethod: string;
  statusLabel: string;
  summary: string;
  budgetPlanned: number | null;
  budgetActual: number | null;
  timelinePlannedDays: number | null;
  timelineActualDays: number | null;
  completionPct: number;
  updatedAt: string;
  dataCoveragePct: number;
  sourceCount: number;
  sourceQuality: "high" | "medium" | "low";
  milestones: ProjectTimelineEvent[];
};

export const projects: SpendingProject[] = [
  {
    slug: "piacenza-school-meal-quality-control",
    code: "PC-EDU-001",
    title: "Controllo qualita della ristorazione scolastica a Piacenza",
    authority: "Comune di Piacenza",
    location: "Piacenza, Italia",
    sector: "Servizi scolastici",
    contractor: "Aggiudicatario non identificato nei documenti pubblici esaminati",
    procurementMethod: "Dossier pubblico di gara",
    statusLabel: "Servizio monitorato",
    summary: "Dossier ufficiale sul servizio di controllo qualita della ristorazione scolastica presso nidi comunali e scuole statali. Le fonti pubbliche esaminate mostrano durata definita e valore stimato, ma non l'intera catena di aggiudicazione nel materiale fin qui verificato.",
    budgetPlanned: 213607.83,
    budgetActual: null,
    timelinePlannedDays: 943,
    timelineActualDays: null,
    completionPct: 0,
    updatedAt: "2026-04-03",
    dataCoveragePct: 72,
    sourceCount: 3,
    sourceQuality: "medium",
    milestones: [
      { date: "2023-01-01", label: "Avvio finestra di servizio", note: "Il dossier tecnico esaminato fissa l'avvio ordinario del contratto al 1 gennaio 2023." },
      { date: "2025-07-31", label: "Scadenza ordinaria", note: "Lo stesso dossier indica una durata ordinaria fino al 31 luglio 2025." },
      { date: "2025-2026", label: "Prosecuzione opzionale", note: "Nel testo pubblico esaminato compaiono una possibile ripetizione per l'anno scolastico 2025-2026 e una proroga tecnica di sei mesi." },
      { date: "2026-04-03", label: "Nota di monitoraggio", note: "SpendLens classifica questa scheda in giallo perche il materiale pubblico esaminato fornisce valore pianificato e durata, ma non l'esito completo di aggiudicazione nelle fonti controllate." }
    ]
  },
  {
    slug: "piacenza-school-bus-service",
    code: "PC-EDU-002",
    title: "Servizio scuolabus del Comune di Piacenza",
    authority: "Comune di Piacenza",
    location: "Piacenza, Italia",
    sector: "Servizi scolastici",
    contractor: "Operatore esterno citato, ma non nominato nella pagina di servizio esaminata",
    procurementMethod: "Pagina ufficiale di servizio attivo",
    statusLabel: "Servizio monitorato",
    summary: "Il Comune pubblica il servizio di trasporto scolastico come attivo per scuole selezionate e dichiara esplicitamente che e' affidato a una ditta esterna. La fonte esaminata e' utile per monitorare il servizio, ma non espone importo contrattuale o dettagli di aggiudicazione.",
    budgetPlanned: null,
    budgetActual: null,
    timelinePlannedDays: null,
    timelineActualDays: null,
    completionPct: 0,
    updatedAt: "2026-04-03",
    dataCoveragePct: 49,
    sourceCount: 2,
    sourceQuality: "medium",
    milestones: [
      { date: "2025-09-01", label: "Riapertura iscrizioni", note: "La pagina ufficiale esaminata indica che le iscrizioni al trasporto scolastico riaprono dal 1 settembre 2025." },
      { date: "2025-2026", label: "Percorsi pubblicati", note: "Il testo pubblico esaminato elenca le scuole servite e segnala due corse giornaliere, dal lunedi al venerdi, secondo calendario scolastico." },
      { date: "2025-2026", label: "Ditta esterna citata", note: "La stessa pagina ufficiale dichiara che il servizio e' affidato a una ditta esterna, ma non identifica l'operatore nel contenuto estratto." },
      { date: "2026-04-03", label: "Nota di monitoraggio", note: "SpendLens assegna il giallo perche il servizio e' chiaramente pubblico e attivo, ma la fonte esaminata non fornisce ancora importo di gara, CIG o atto di aggiudicazione." }
    ]
  },
  {
    slug: "piacenza-school-disability-integration-service",
    code: "PC-EDU-003",
    title: "Integrazione scolastica per alunni con disabilita a Piacenza",
    authority: "Comune di Piacenza",
    location: "Piacenza, Italia",
    sector: "Servizi scolastici",
    contractor: "Personale educativo specialistico, operatore non nominato nella pagina di servizio esaminata",
    procurementMethod: "Pagina ufficiale di servizio e riferimento provinciale di cornice",
    statusLabel: "Servizio monitorato",
    summary: "Il Comune pubblica un servizio dedicato all'integrazione scolastica degli alunni con disabilita certificata e lo collega all'accordo provinciale per l'inclusione scolastica. La pagina pubblica esaminata documenta perimetro e condizioni di accesso, ma non l'importo della procedura sottostante.",
    budgetPlanned: null,
    budgetActual: null,
    timelinePlannedDays: null,
    timelineActualDays: null,
    completionPct: 0,
    updatedAt: "2026-04-03",
    dataCoveragePct: 52,
    sourceCount: 2,
    sourceQuality: "medium",
    milestones: [
      { date: "2024-10-31", label: "Pagina aggiornata", note: "La pagina ufficiale esaminata risulta aggiornata al 31 ottobre 2024." },
      { date: "Anno scolastico", label: "Condizione di accesso documentata", note: "Le famiglie richiedono il supporto tramite la scuola, con documentazione diagnostica e indicazione UONPIA richiamate nel testo pubblicato." },
      { date: "Anno scolastico", label: "Perimetro esteso", note: "La pagina pubblica esaminata afferma che il Comune sostiene l'inclusione anche in alcuni casi di scuole private o fuori Comune tramite rimborso o supporto educativo." },
      { date: "2026-04-03", label: "Nota di monitoraggio", note: "SpendLens classifica questo dossier in giallo perche il perimetro del servizio e' esplicito nelle fonti pubbliche, ma il materiale esaminato non espone ancora valore contrattuale o identita dell'operatore." }
    ]
  }
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
