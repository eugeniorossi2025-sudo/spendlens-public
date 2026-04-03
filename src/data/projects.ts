export type ProjectTimelineEvent = {
  date: string;
  label: string;
  note: string;
};

export type ProjectEvidence = {
  label: string;
  value: string;
};

export type ProjectSource = {
  label: string;
  url?: string;
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
  dossierStrength: "strong" | "partial";
  dossierNote: string;
  evidence: ProjectEvidence[];
  missingFacts: string[];
  sources: ProjectSource[];
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
    statusLabel: "Procedura aggiudicata",
    summary: "Procedura pubblica G00167 del Comune di Piacenza per il controllo qualita della ristorazione scolastica presso nidi comunali e scuole statali. Qui esiste un vero dossier di gara con CIG, importo, date, documentazione e stato concluso-aggiudicato; resta invece non visibile, nel materiale controllato, l'identita dell'aggiudicatario.",
    budgetPlanned: 254149.72,
    budgetActual: null,
    timelinePlannedDays: 943,
    timelineActualDays: null,
    completionPct: 0,
    updatedAt: "2026-04-03",
    dataCoveragePct: 72,
    sourceCount: 4,
    sourceQuality: "medium",
    dossierStrength: "strong",
    dossierNote: "Dossier forte: procedura di gara ufficiale con CIG, importi, date e documenti pubblici verificati.",
    evidence: [
      { label: "Riferimento procedura", value: "G00167" },
      { label: "CIG", value: "9490419D80" },
      { label: "Valore complessivo", value: "254.149,72 EUR" },
      { label: "Importo a base di gara", value: "135.139,65 EUR" },
      { label: "Pubblicazione", value: "21/11/2022" },
      { label: "Scadenza offerte", value: "02/12/2022 ore 12:00" },
      { label: "Stato portale", value: "Conclusa - Aggiudicata" },
    ],
    missingFacts: [
      "Nome dell'aggiudicatario non emerso nelle fonti pubbliche verificate in questa iterazione.",
      "Consuntivo economico finale non pubblicato nella scheda usata come fonte primaria.",
      "Tempi effettivi di esecuzione non disponibili nella documentazione controllata.",
    ],
    sources: [
      {
        label: "Scheda procedura G00167",
        url: "https://appalti.comune.piacenza.it/PortaleAppalti/it/ppgare_bandi_lista.wp?actionPath=/ExtStr2/do/FrontEnd/Bandi/view.action&currentFrame=7&codice=G00167",
        note: "Pagina ufficiale di dettaglio con CIG, importi, date, stato e collegamenti ai documenti di gara.",
      },
      {
        label: "Portale gare e procedure del Comune",
        url: "https://appalti.comune.piacenza.it/PortaleAppalti/it/ppgare_bandi_lista.wp",
        note: "Sezione istituzionale che ospita la procedura pubblica e il relativo tracciato documentale.",
      },
      {
        label: "Documentazione di gara richiamata nella scheda",
        note: "La scheda G00167 espone almeno bando di gara, norme di gara e capitolato come documenti pubblici allegati.",
      },
      {
        label: "Esito integrato nella scheda procedura",
        note: "Nel dettaglio procedura compare stato conclusa-aggiudicata e richiamo a esito di gara aggiornato al 11/04/2023.",
      },
    ],
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
    procurementMethod: "Pagina di servizio comunale non piu disponibile in verifica corrente",
    statusLabel: "Dossier parziale",
    summary: "Il servizio scuolabus resta un riferimento debole: sappiamo che esisteva una pagina comunale che descriveva iscrizioni, scuole servite e presenza di un operatore esterno, ma la URL verificata oggi risponde 410 e non abbiamo ancora ricostruito una fonte viva con importi o atti di affidamento.",
    budgetPlanned: null,
    budgetActual: null,
    timelinePlannedDays: null,
    timelineActualDays: null,
    completionPct: 0,
    updatedAt: "2026-04-03",
    dataCoveragePct: 49,
    sourceCount: 2,
    sourceQuality: "medium",
    dossierStrength: "partial",
    dossierNote: "Dossier parziale: esiste un servizio pubblico descritto, ma la fonte operativa usata in precedenza non e' piu viva e mancano riferimenti contrattuali solidi.",
    evidence: [
      { label: "Fatto verificato storicamente", value: "Servizio scuolabus presentato come attivo dal Comune" },
      { label: "Dettaglio ricordato dalla fonte", value: "Iscrizioni dal 01/09/2025" },
      { label: "Copertura servizio", value: "Scuole selezionate con due corse giornaliere" },
      { label: "Operatore", value: "Ditta esterna citata ma non nominata" },
      { label: "Verifica corrente URL", value: "La URL controllata il 03/04/2026 risponde 410 Gone" },
    ],
    missingFacts: [
      "Importo contrattuale o base di gara non disponibile.",
      "CIG non verificato.",
      "Atto di aggiudicazione non ricostruito.",
      "Nome dell'operatore non emerso dalle fonti oggi vive.",
    ],
    sources: [
      {
        label: "URL di servizio verificata il 03/04/2026",
        url: "https://www.comune.piacenza.it/aree-tematiche/scuola-e-educazione/trasporto-scolastico",
        note: "La pagina oggi risponde 410 Gone; viene mantenuta come traccia del riferimento storico usato nel dossier.",
      },
      {
        label: "Nota editoriale SpendLens",
        note: "Fino a quando non viene recuperata una fonte viva o un atto di gara, questa scheda va letta come segnalazione di copertura documentale incompleta.",
      },
    ],
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
    procurementMethod: "Pagina di servizio e riferimento di cornice non pienamente ricostruiti in verifica corrente",
    statusLabel: "Dossier parziale",
    summary: "Anche il dossier sull'integrazione scolastica e' oggi incompleto: il servizio comunale e il richiamo alla cornice provinciale risultano coerenti con quanto emerso in precedenza, ma la pagina verificata in questa sessione non e' piu disponibile e non disponiamo ancora di una procedura di affidamento pubblica collegata.",
    budgetPlanned: null,
    budgetActual: null,
    timelinePlannedDays: null,
    timelineActualDays: null,
    completionPct: 0,
    updatedAt: "2026-04-03",
    dataCoveragePct: 52,
    sourceCount: 2,
    sourceQuality: "medium",
    dossierStrength: "partial",
    dossierNote: "Dossier parziale: perimetro del servizio plausibile e gia visto in fonti istituzionali, ma senza una fonte viva abbastanza forte da sostenere importi o affidamenti.",
    evidence: [
      { label: "Perimetro servizio", value: "Supporto all'integrazione scolastica per alunni con disabilita certificata" },
      { label: "Condizione di accesso", value: "Richiamo a certificazione diagnostica e indicazione UONPIA" },
      { label: "Data ricordata dalla fonte", value: "Pagina risultata aggiornata al 31/10/2024" },
      { label: "Ambito ulteriore", value: "Citato supporto anche in alcuni casi di scuole private o fuori Comune" },
      { label: "Verifica corrente URL", value: "La URL controllata il 03/04/2026 risponde 410 Gone" },
    ],
    missingFacts: [
      "Importo della procedura o del servizio non disponibile.",
      "CIG non verificato.",
      "Operatore affidatario non identificato.",
      "Collegamento pubblico attivo alla cornice provinciale non ancora ricostruito in questa iterazione.",
    ],
    sources: [
      {
        label: "URL di servizio verificata il 03/04/2026",
        url: "https://www.comune.piacenza.it/aree-tematiche/scuola-e-educazione/integrazione-scolastica-disabili",
        note: "La pagina oggi risponde 410 Gone; viene mantenuta come traccia del riferimento storico usato nel dossier.",
      },
      {
        label: "Nota editoriale SpendLens",
        note: "Questa scheda non va letta come ricostruzione contrattuale ma come segnalazione di servizio pubblico con copertura documentale insufficiente.",
      },
    ],
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
