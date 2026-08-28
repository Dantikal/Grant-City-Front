# Grand City

A boutique real-estate studio website, built from the **North & Oak** design.

## Stack

- **Next.js (App Router) · React · TypeScript**
- **Tailwind CSS v4 · shadcn/ui** components
- **Framer Motion** animations
- **Zustand** (filter state) · **TanStack Query** (data fetching/caching)
- **Dexie.js (IndexedDB)** for favorites
- **React Hook Form + Zod** forms
- **Embla Carousel** galleries · **Leaflet + OpenStreetMap** maps · **@react-pdf/renderer** brochures
- **Lucide** icons · **Sonner** toasts · **date-fns**

## Architecture — Feature-Sliced Design

```
src/
  app/        Next.js routes (pages, layouts, admin)
  widgets/    Composite sections (header, hero, catalog, footer, …)
  features/   User interactions (search, filters, favorites, booking, …)
  entities/   Domain models + UI (property, agent, service, booking, request, company)
  shared/     ui (shadcn), lib, hooks, api, db (Dexie), config, constants, styles
```

Dependencies only ever point **downward**: `app → widgets → features → entities → shared`.

## Getting started

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_API_URL to the backend base URL
npm run dev
```

Open http://localhost:3000.

## Notes

- **All data comes from the REST API** at `NEXT_PUBLIC_API_URL` (contract in
  [`API.md`](./API.md), backend spec in [`BACKEND_TASK.md`](./BACKEND_TASK.md)).
  The only exception is the services list — fixed, translated marketing content
  shipped with the frontend (`src/entities/service/model/service.mocks.ts`).
- Favorites persist locally in IndexedDB via Dexie (a browser preference, not API data).
- The map uses OpenStreetMap tiles via Leaflet — no token or account needed.
- Fonts (Manrope, Cormorant Garamond) are self-hosted via `@fontsource` packages —
  no call to Google Fonts at build/dev time, so the site builds and runs fully offline.
- The original design prototype is preserved in `_prototype/`.

## Scripts

`npm run dev` · `npm run build` · `npm run start` · `npm run lint` · `npm run typecheck` · `npm run format`
