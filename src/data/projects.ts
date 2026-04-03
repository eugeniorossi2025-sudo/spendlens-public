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
  },
  {
    slug: "piacenza-disability-group-home-verano",
    code: "PC-SOC-001",
    title: "Gruppo appartamento per adulti con disabilita a Verano di Podenzano",
    authority: "Comune di Piacenza",
    location: "Piacenza, Italia",
    sector: "Inclusione e disabilita",
    contractor: "Aggiudicatario non esplicitato nell'estrazione pubblica consultata",
    procurementMethod: "Esito di affidamento diretto pubblicato sul portale appalti",
    statusLabel: "Aggiudicata",
    summary: "Esito pubblico G00869 relativo a servizi di accoglienza, per adulti e minori in condizioni di disabilita e accoglienza, nella modalita del gruppo appartamento in Verano di Podenzano. La scheda ufficiale rende visibili titolo, CIG, periodo, RUP e stato di aggiudicazione.",
    budgetPlanned: null,
    budgetActual: null,
    timelinePlannedDays: 61,
    timelineActualDays: null,
    completionPct: 0,
    updatedAt: "2026-04-03",
    dataCoveragePct: 74,
    sourceCount: 2,
    sourceQuality: "high",
    dossierStrength: "strong",
    dossierNote: "Dossier forte: esito ufficiale con CIG, periodo di servizio, RUP e stato di aggiudicazione pubblicati.",
    evidence: [
      { label: "Riferimento procedura", value: "G00869" },
      { label: "CIG", value: "BAF82D16CE" },
      { label: "Data pubblicazione esito", value: "02/04/2026" },
      { label: "Periodo di servizio", value: "01/04/2026 - 31/05/2026" },
      { label: "Stato portale", value: "Conclusa - Aggiudicata" },
      { label: "RUP", value: "Bernardelli Emanuele" },
    ],
    missingFacts: [
      "Valore economico non emerso nella scheda estratta in questa iterazione.",
      "Nome dell'aggiudicatario non reso leggibile nell'estrazione consultata.",
      "Documentazione di esito non allegata nella pagina letta automaticamente.",
    ],
    sources: [
      {
        label: "Scheda esito G00869",
        url: "https://appalti.comune.piacenza.it/PortaleAppalti/it/ppgare_esiti_lista.wp?actionPath=/ExtStr2/do/FrontEnd/Esiti/view.action&currentFrame=7&codice=G00869",
        note: "Pagina ufficiale con titolo, CIG, periodo, RUP, stato e riferimento procedura.",
      },
      {
        label: "Lista esiti del portale appalti",
        url: "https://appalti.comune.piacenza.it/PortaleAppalti/it/ppgare_esiti_lista.wp",
        note: "Registro istituzionale degli esiti del Comune di Piacenza da cui il dossier e' stato selezionato.",
      },
    ],
    milestones: [
      { date: "2026-04-01", label: "Avvio periodo di servizio", note: "La scheda esito pubblica il periodo di riferimento a partire dal 1 aprile 2026." },
      { date: "2026-05-31", label: "Scadenza prevista", note: "Lo stesso esito indica termine al 31 maggio 2026." },
      { date: "2026-04-02", label: "Esito pubblicato", note: "Il Comune di Piacenza pubblica l'esito con CIG BAF82D16CE e stato conclusa-aggiudicata." },
      { date: "2026-04-03", label: "Nota di monitoraggio", note: "Dossier classificato forte per qualita della fonte, ma con valore economico non ancora emerso nell'estrazione automatica." },
    ]
  },
  {
    slug: "piacenza-disability-group-homes-scalabrini-landi",
    code: "PC-SOC-002",
    title: "Gruppi appartamento disabilita in via Scalabrini e via Landi",
    authority: "Comune di Piacenza",
    location: "Piacenza, Italia",
    sector: "Inclusione e disabilita",
    contractor: "Aggiudicatario AD non reso nominalmente leggibile nell'estrazione pubblica",
    procurementMethod: "Esito di affidamento diretto con pubblicazione ANAC",
    statusLabel: "Contratto emesso",
    summary: "Esito pubblico G00868 per servizi di accoglienza nei gruppi appartamento di via Scalabrini e via Landi, con progetto individualizzato aggiuntivo per un adulto con disabilita residente nel Comune di Piacenza. Oltre alla scheda comunale, esiste pubblicazione legale ANAC con valore dell'affidamento.",
    budgetPlanned: null,
    budgetActual: 91510.76,
    timelinePlannedDays: 61,
    timelineActualDays: null,
    completionPct: 0,
    updatedAt: "2026-04-03",
    dataCoveragePct: 88,
    sourceCount: 3,
    sourceQuality: "high",
    dossierStrength: "strong",
    dossierNote: "Dossier forte: esito ufficiale e pagina ANAC convergono su CIG, periodo, stato e valore di affidamento.",
    evidence: [
      { label: "Riferimento procedura", value: "G00868" },
      { label: "CIG", value: "BB02138E8A" },
      { label: "Valore affidamento", value: "91.510,76 EUR" },
      { label: "Data pubblicazione esito", value: "02/04/2026" },
      { label: "Periodo di servizio", value: "01/04/2026 - 31/05/2026" },
      { label: "Stato portale", value: "Conclusa - Emesso contratto/ordine" },
      { label: "RUP", value: "Bernardelli Emanuele" },
    ],
    missingFacts: [
      "Nome dell'operatore non visibile nell'estrazione testuale della pagina ANAC.",
      "Scostamento economico non calcolabile per assenza di base di gara nell'estrazione consultata.",
    ],
    sources: [
      {
        label: "Scheda esito G00868",
        url: "https://appalti.comune.piacenza.it/PortaleAppalti/it/ppgare_esiti_lista.wp?actionPath=/ExtStr2/do/FrontEnd/Esiti/view.action&currentFrame=7&codice=G00868",
        note: "Pagina ufficiale con CIG, periodo, stato e riferimento procedura.",
      },
      {
        label: "Pubblicazione legale ANAC",
        url: "https://pubblicitalegale.anticorruzione.it/esiti/a3531df0-d905-49fe-b446-b1d2b326f6f7",
        note: "Pagina che espone il valore di affidamento pari a 91.510,76 EUR e collega ai documenti di procedura.",
      },
      {
        label: "Procedura codice G00868",
        url: "https://appalti.comune.piacenza.it/PortaleAppalti/it/procedure/codice/G00868",
        note: "Riferimento procedurale richiamato dalla pubblicazione legale ANAC.",
      },
    ],
    milestones: [
      { date: "2026-04-01", label: "Avvio periodo di servizio", note: "La scheda esito fissa l'inizio del servizio al 1 aprile 2026." },
      { date: "2026-05-31", label: "Fine periodo previsto", note: "Il periodo pubblicato termina il 31 maggio 2026." },
      { date: "2026-04-02", label: "Esito comunale", note: "Il Comune pubblica l'esito con stato conclusa-emesso contratto/ordine." },
      { date: "2026-03-27", label: "Pubblicazione legale ANAC", note: "ANAC espone il valore di affidamento a 91.510,76 EUR." },
    ]
  },
  {
    slug: "piacenza-pnrr-disability-autonomy-traineeships",
    code: "PC-SOC-003",
    title: "Tirocini PNRR per autonomia delle persone con disabilita",
    authority: "Comune di Piacenza",
    location: "Piacenza, Italia",
    sector: "Inclusione e disabilita",
    contractor: "Operatore non reso leggibile nell'estrazione pubblica consultata",
    procurementMethod: "Esito di affidamento diretto nell'ambito PNRR Missione 5 Componente 2",
    statusLabel: "Aggiudicata",
    summary: "Esito pubblico G00873 per il servizio di attivita di formazione e di soggetto promotore di tirocini formativi di tipo C e D, finanziati dal PNRR per percorsi di autonomia delle persone con disabilita. La scheda istituzionale espone CIG, CUP, periodo, stato e RUP.",
    budgetPlanned: null,
    budgetActual: null,
    timelinePlannedDays: 77,
    timelineActualDays: null,
    completionPct: 0,
    updatedAt: "2026-04-03",
    dataCoveragePct: 82,
    sourceCount: 2,
    sourceQuality: "high",
    dossierStrength: "strong",
    dossierNote: "Dossier forte: fonte ufficiale con CIG, CUP, finestra temporale, RUP e collegamento esplicito al perimetro PNRR.",
    evidence: [
      { label: "Riferimento procedura", value: "G00873" },
      { label: "CIG", value: "BB14AFE988" },
      { label: "CUP", value: "E34H22000400006" },
      { label: "Data pubblicazione esito", value: "31/03/2026" },
      { label: "Periodo di servizio", value: "15/04/2026 - 30/06/2026" },
      { label: "Stato portale", value: "Conclusa - Aggiudicata" },
      { label: "RUP", value: "Bernardelli Emanuele" },
    ],
    missingFacts: [
      "Valore economico non emerso nella lettura automatica della scheda.",
      "Operatore aggiudicatario non visibile nell'estrazione consultata.",
      "Documentazione esito non allegata nella pagina letta automaticamente.",
    ],
    sources: [
      {
        label: "Scheda esito G00873",
        url: "https://appalti.comune.piacenza.it/PortaleAppalti/it/ppgare_esiti_lista.wp?actionPath=/ExtStr2/do/FrontEnd/Esiti/view.action&currentFrame=7&codice=G00873",
        note: "Pagina ufficiale con titolo completo, CIG, CUP, periodo, stato e riferimento procedura.",
      },
      {
        label: "Lista esiti del portale appalti",
        url: "https://appalti.comune.piacenza.it/PortaleAppalti/it/ppgare_esiti_lista.wp",
        note: "Registro istituzionale degli esiti dove compare la procedura PNRR su autonomia per persone con disabilita.",
      },
    ],
    milestones: [
      { date: "2026-03-31", label: "Esito pubblicato", note: "Il Comune pubblica l'esito G00873 con CIG, CUP e stato conclusa-aggiudicata." },
      { date: "2026-04-15", label: "Avvio previsto del servizio", note: "Il periodo operativo indicato dalla scheda parte dal 15 aprile 2026." },
      { date: "2026-06-30", label: "Termine previsto", note: "La finestra di servizio pubblicata termina il 30 giugno 2026." },
      { date: "2026-04-03", label: "Nota di monitoraggio", note: "Dossier forte per solidita della fonte pubblica, ma senza valore economico leggibile nell'estrazione corrente." },
    ]
  },
  {
    slug: "piacenza-public-bathrooms-service",
    code: "PC-PAT-001",
    title: "Apertura, pulizia e custodia di 5 bagni pubblici comunali",
    authority: "Comune di Piacenza",
    location: "Piacenza, Italia",
    sector: "Patrimonio e spazi pubblici",
    contractor: "Operatore non reso leggibile nell'estrazione testuale disponibile",
    procurementMethod: "Procedura aperta con esito e documenti collegati",
    statusLabel: "Contratto emesso",
    summary: "Esito pubblico G00798 per il servizio di apertura, chiusura, pulizia e custodia di cinque bagni pubblici comunali, con durata pluriennale e documentazione pubblica collegata. La scheda richiama sia un eForm TED sia un documento di esito gara scaricabile dal portale comunale.",
    budgetPlanned: null,
    budgetActual: null,
    timelinePlannedDays: 912,
    timelineActualDays: null,
    completionPct: 0,
    updatedAt: "2026-04-03",
    dataCoveragePct: 84,
    sourceCount: 4,
    sourceQuality: "high",
    dossierStrength: "strong",
    dossierNote: "Dossier forte: procedura aperta con CIG, durata, documenti di esito e collegamento TED pubblicamente consultabili.",
    evidence: [
      { label: "Riferimento procedura", value: "G00798" },
      { label: "CIG", value: "B937C24BFB" },
      { label: "Data pubblicazione esito", value: "10/03/2026" },
      { label: "Periodo di servizio", value: "01/01/2026 - 30/06/2028" },
      { label: "Stato portale", value: "Conclusa - Emesso contratto/ordine" },
      { label: "RUP", value: "Schiaffonati Emanuela" },
      { label: "Clausola sociale", value: "Contratto riservato richiamato da art. 61 D.Lgs. 36/2023 e L.R. 12/2014" },
    ],
    missingFacts: [
      "Valore economico non emerso nell'estrazione testuale utilizzata per questo passaggio.",
      "Nome dell'affidatario non visibile nell'estrazione corrente.",
    ],
    sources: [
      {
        label: "Scheda esito G00798",
        url: "https://appalti.comune.piacenza.it/PortaleAppalti/it/ppgare_esiti_lista.wp?actionPath=/ExtStr2/do/FrontEnd/Esiti/view.action&currentFrame=7&codice=G00798",
        note: "Pagina ufficiale con CIG, titolo, periodo, stato e riferimenti documentali.",
      },
      {
        label: "eForm TED collegato",
        url: "https://ted.europa.eu/udl?uri=TED:NOTICE:162652-2026:TEXT:IT:HTML",
        note: "Avviso europeo richiamato direttamente nella scheda di esito comunale.",
      },
      {
        label: "Esito di gara scaricabile",
        url: "https://appalti.comune.piacenza.it/PortaleAppalti/do/FrontEnd/DocDig/downloadDocumentoPubblico.action?codice=G00798&id=14327&idprg=",
        note: "Documento pubblico di esito gara collegato nella scheda del portale.",
      },
      {
        label: "Lista esiti del portale appalti",
        url: "https://appalti.comune.piacenza.it/PortaleAppalti/it/ppgare_esiti_lista.wp",
        note: "Registro istituzionale degli esiti del Comune di Piacenza.",
      },
    ],
    milestones: [
      { date: "2026-01-01", label: "Decorrenza servizio", note: "Il servizio e' pubblicato con decorrenza dal 1 gennaio 2026 o dal verbale di consegna." },
      { date: "2028-06-30", label: "Termine previsto", note: "La scheda di esito indica durata fino al 30 giugno 2028." },
      { date: "2026-03-10", label: "Esito pubblicato", note: "Il Comune pubblica l'esito con stato conclusa-emesso contratto/ordine." },
      { date: "2026-04-03", label: "Nota di monitoraggio", note: "Dossier forte grazie a pluralita di fonti pubbliche collegate, pur senza valore economico leggibile nell'estrazione corrente." },
    ]
  },
  {
    slug: "piacenza-franzanti-sports-center-concession",
    code: "PC-PAT-002",
    title: "Riqualificazione e gestione del centro polisportivo E. Franzanti",
    authority: "Comune di Piacenza",
    location: "Piacenza, Italia",
    sector: "Patrimonio e spazi pubblici",
    contractor: "Aggiudicatario presente nella pubblicazione legale, non leggibile nell'estrazione automatica corrente",
    procurementMethod: "Concessione in finanza di progetto con pubblicazione ANAC e TED",
    statusLabel: "Contratto emesso",
    summary: "Concessione G00704 per riqualificazione e gestione del centro polisportivo E. Franzanti, uno dei dossier economicamente piu rilevanti emersi nel portale pubblico. La pubblicazione ANAC espone un valore complessivo e un valore offerta vincente pari a oltre 100 milioni di euro.",
    budgetPlanned: null,
    budgetActual: 100143503,
    timelinePlannedDays: null,
    timelineActualDays: null,
    completionPct: 0,
    updatedAt: "2026-04-03",
    dataCoveragePct: 93,
    sourceCount: 4,
    sourceQuality: "high",
    dossierStrength: "strong",
    dossierNote: "Dossier forte: concessione strategica con CIG, CUP, valore stimato, offerta vincente e doppia tracciatura ANAC-TED.",
    evidence: [
      { label: "Riferimento procedura", value: "G00704" },
      { label: "CIG", value: "B7EF2981C5" },
      { label: "CUP", value: "E35B24000770004" },
      { label: "Valore complessivo stimato", value: "100.143.503,00 EUR" },
      { label: "Valore offerta vincente", value: "100.143.503,00 EUR" },
      { label: "Data pubblicazione esito", value: "06/03/2026" },
      { label: "Stato portale", value: "Conclusa - Emesso contratto/ordine" },
      { label: "CPV", value: "Servizi di gestione di impianti sportivi" },
      { label: "RUP", value: "Mari Enrico" },
    ],
    missingFacts: [
      "Durata operativa non emersa nell'estrazione automatica della pagina consultata.",
      "Nome dell'aggiudicatario non leggibile nel testo estratto dalla pubblicazione ANAC.",
    ],
    sources: [
      {
        label: "Scheda esito G00704",
        url: "https://appalti.comune.piacenza.it/PortaleAppalti/it/ppgare_esiti_lista.wp?actionPath=/ExtStr2/do/FrontEnd/Esiti/view.action&currentFrame=7&codice=G00704",
        note: "Pagina ufficiale con CIG, CUP, stato, RUP e rinvii documentali.",
      },
      {
        label: "Pubblicazione legale ANAC",
        url: "https://pubblicitalegale.anticorruzione.it/esiti/534be556-a119-4ece-83f3-e2ad74c7133c",
        note: "Pagina che espone il valore complessivo stimato e il valore dell'offerta vincente pari a 100.143.503,00 EUR.",
      },
      {
        label: "eForm TED collegato",
        url: "https://ted.europa.eu/udl?uri=TED:NOTICE:142050-2026:TEXT:IT:HTML",
        note: "Avviso europeo di aggiudicazione richiamato nella pubblicazione ufficiale.",
      },
      {
        label: "Procedura codice G00704",
        url: "https://appalti.comune.piacenza.it/PortaleAppalti/it/procedure/codice/G00704",
        note: "Riferimento procedurale richiamato nella pubblicazione legale ANAC.",
      },
    ],
    milestones: [
      { date: "2026-03-03", label: "Pubblicazione legale ANAC", note: "ANAC pubblica l'avviso di aggiudicazione della concessione Franzanti." },
      { date: "2026-03-06", label: "Esito comunale", note: "Il Comune espone la scheda G00704 con stato conclusa-emesso contratto/ordine." },
      { date: "2026-03-06", label: "Valore reso pubblico", note: "La pubblicazione ANAC indica valore complessivo stimato e offerta vincente a 100.143.503,00 EUR." },
      { date: "2026-04-03", label: "Nota di monitoraggio", note: "Dossier tra i piu strategici del pilot per rilevanza economica e visibilita delle fonti." },
    ]
  },
  {
    slug: "piacenza-municipal-buildings-ape-service",
    code: "PC-PAT-003",
    title: "Attestati di prestazione energetica per immobili comunali",
    authority: "Comune di Piacenza",
    location: "Piacenza, Italia",
    sector: "Patrimonio e spazi pubblici",
    contractor: "Aggiudicatario AD non reso nominalmente leggibile nell'estrazione pubblica",
    procurementMethod: "Affidamento diretto con pubblicazione ANAC e collegamento alla procedura",
    statusLabel: "Aggiudicata",
    summary: "Dossier G00872 sul servizio di redazione di attestati di prestazione energetica relativi a diversi immobili di proprieta comunale. La pubblicazione legale ANAC rende visibile un valore di affidamento pari a 47.500,00 EUR.",
    budgetPlanned: null,
    budgetActual: 47500,
    timelinePlannedDays: null,
    timelineActualDays: null,
    completionPct: 0,
    updatedAt: "2026-04-03",
    dataCoveragePct: 89,
    sourceCount: 3,
    sourceQuality: "high",
    dossierStrength: "strong",
    dossierNote: "Dossier forte: esito comunale e pubblicazione legale ANAC convergono su CIG, CUP e valore di affidamento.",
    evidence: [
      { label: "Riferimento procedura", value: "G00872" },
      { label: "CIG", value: "BB122831B9" },
      { label: "CUP principale esposto", value: "E32C22000160001" },
      { label: "Valore affidamento", value: "47.500,00 EUR" },
      { label: "Data pubblicazione esito", value: "03/04/2026" },
      { label: "Stato portale", value: "Conclusa - Aggiudicata" },
      { label: "RUP", value: "Saliba Sara" },
    ],
    missingFacts: [
      "Durata del servizio non emersa nell'estrazione consultata.",
      "Nome dell'affidatario non leggibile nella pagina ANAC estratta automaticamente.",
    ],
    sources: [
      {
        label: "Scheda esito G00872",
        url: "https://appalti.comune.piacenza.it/PortaleAppalti/it/ppgare_esiti_lista.wp?actionPath=/ExtStr2/do/FrontEnd/Esiti/view.action&currentFrame=7&codice=G00872",
        note: "Pagina ufficiale con CIG, CUP, stato, RUP e riferimento procedura.",
      },
      {
        label: "Pubblicazione legale ANAC",
        url: "https://pubblicitalegale.anticorruzione.it/esiti/ea75d6f1-3fbe-40d8-bb82-c18b9236ee9c",
        note: "Pagina che espone il valore di affidamento pari a 47.500,00 EUR e rimanda ai documenti di procedura.",
      },
      {
        label: "Procedura codice G00872",
        url: "https://appalti.comune.piacenza.it/PortaleAppalti/it/procedure/codice/G00872",
        note: "Riferimento procedurale richiamato nella pubblicazione legale ANAC.",
      },
    ],
    milestones: [
      { date: "2026-04-01", label: "Pubblicazione legale ANAC", note: "La pubblicazione legale espone l'affidamento diretto e il relativo valore economico." },
      { date: "2026-04-03", label: "Esito comunale", note: "Il Comune pubblica la scheda G00872 con stato conclusa-aggiudicata." },
      { date: "2026-04-03", label: "Valore reso pubblico", note: "ANAC espone un valore di affidamento pari a 47.500,00 EUR." },
      { date: "2026-04-03", label: "Nota di monitoraggio", note: "Dossier forte per allineamento tra portale comunale e pubblicazione legale ANAC." },
    ]
  }
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
