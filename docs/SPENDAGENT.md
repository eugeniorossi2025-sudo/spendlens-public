# SPENDAGENT - SpendLens Public

Agente operativo per `eugeniorossi2025-sudo/spendlens-public`.

## Regola di pubblicazione

`spendagent` puo' preparare aggiornamenti contenuto automaticamente, ma pubblica su `main` solo dopo approvazione esplicita.

Comando di approvazione nella PR:

```text
APPROVATO PUBBLICA
```

## Flusso

1. `SpendAgent Daily Content` gira ogni giorno alle 06:15 UTC o manualmente.
2. Esegue ricerca Piacenza, build dossier, validator, report, lint e build.
3. Apre una PR con report in `docs/spendagent/reports/latest.md`.
4. La PR resta in attesa di approvazione.
5. Dopo `APPROVATO PUBBLICA`, `SpendAgent Publish Approved` fa merge su `main`.
6. Vercel pubblica da `main`.
7. Il workflow aspetta e controlla le route live principali.

## Collaudo richiesto

- Leggere report PR.
- Verificare eventuale Vercel Preview nella PR.
- Controllare `Nuovi dossier pubblicati` in homepage.
- Commentare `APPROVATO PUBBLICA` solo se fonti e note sono corrette.

## URL

- Live: `https://public-spending-mvp.vercel.app`
- Dashboard: `https://public-spending-mvp.vercel.app/dashboard`
- Fonti: `https://public-spending-mvp.vercel.app/sources`
