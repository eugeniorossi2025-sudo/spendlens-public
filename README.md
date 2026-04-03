# SpendLens

Every public euro in view.

SpendLens is a fast MVP for public spending transparency. It is designed to make public project delivery legible in seconds through a clean dashboard, explicit traffic-light rules, and visible data provenance.

## Why this exists

Most public spending portals publish a lot of data but make risk hard to read. SpendLens starts from a different premise:

- cost drift should be obvious
- time drift should be obvious
- missing data should be obvious
- trust should be earned through clear methodology, not slogans

## MVP structure

- Homepage with concept, trust panel, and dashboard preview
- Dashboard with project register and traffic-light logic
- Project detail pages with audit trail and mock chronology
- Methodology, policy, and sources pages for trust and credibility

## Traffic-light logic

- Cost overrun greater than 20%: red
- Time delay greater than 30%: red
- Missing or incomplete data: yellow

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Mock data for immediate deployment

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm start
```

## Deploy

This app is designed for fast deployment on Vercel.

GitHub is connected so pushes to the production branch can trigger automatic deployments.

```bash
npx vercel
```

## Future expansion

- Replace mock data with API-backed project feeds
- Add filters, maps, and public alerts
- Add organisation, programme, and geography views
- Move validation and ingestion into a dedicated backend later
