# SpendLens Research Agent

Pipeline minima per raccogliere fonti pubbliche su opere, appalti, affidamenti e spesa pubblica nel territorio di Piacenza.

Questo layer non genera dossier editoriali e non formula accuse. Produce JSON grezzo in `src/data/raw/*.json` per un futuro Dossier Builder.

## Comando

```bash
npm run research:piacenza
```

Per una ricerca mirata:

```bash
npm run research:piacenza -- "site:appalti.comune.piacenza.it Piacenza CIG affidamento"
```

## Regole

- usa solo fonti pubbliche prioritarie;
- logga ogni fonte letta;
- conserva URL e testo grezzo;
- estrae solo fatti semplici con URL origine;
- mette i dati non trovati in `missingFacts`;
- non usa generazione AI per inventare dati mancanti.
