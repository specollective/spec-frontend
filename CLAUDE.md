# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SPEC (Sustainable Progress & Equality Collective) frontend — a Next.js 14 website using the **Pages Router** (not App Router). TypeScript with some plain JS files. Node 18.18.2 (pinned).

## Commands

```bash
npm run dev          # Local dev server (port 3000)
npm run build        # Production build
npm run lint         # ESLint (next/core-web-vitals)
npm run test         # Jest + React Testing Library
npm run test -- --watch              # Watch mode
npm run test -- path/to/test.tsx     # Single test file
```

## Environment Variables

Copy `.env.sample` to `.env.local`. The sample only includes Nodemailer credentials. You also need:

- `CONTENTFUL_SPACE_ID` — Contentful CMS space ID
- `CONTENTFUL_ACCESS_TOKEN` — Contentful delivery API token
- `NEXT_PUBLIC_API_URL` — Optional; overrides contact form API URL (defaults to `http://localhost:3000/api/contact`)

## Architecture

### Directory Layout (root-level, no `src/` directory)

- `pages/` — Next.js Pages Router (routes, API routes, `_app.tsx`, `_document.tsx`)
- `components/` — React components (flat structure with some subdirectories)
- `constants/` — Static/fallback data (plain JS)
- `service/` — Nodemailer transport (`mailService.js`)
- `utils/` — Small helpers (contact form fetch wrapper, window utilities)
- `styles/` — `globals.css` (Tailwind directives), `sections.js` (shared Tailwind class strings)
- `__tests__/` — Mirrors source structure (`components/`, `pages/`)

### Data Fetching

- **Contentful CMS**: The homepage uses `getServerSideProps` with the `contentful` SDK to fetch hero content. Falls back to `constants/home-page-data.js` if Contentful is unavailable.
- **Contact form**: `pages/api/contact.ts` receives POST data and sends email via Nodemailer/Gmail SMTP. The client-side wrapper is `utils/contact.ts`.
- No data fetching library (no SWR, React Query). No global state management.

### Styling

- **Tailwind CSS v3** is the primary styling approach — utility classes directly in JSX.
- One CSS Modules outlier: `JoerFormHeader.module.css`.
- Shared Tailwind class strings are in `styles/sections.js` (exported as `sectionClasses`).
- Brand colors use the `spec.*` namespace in `tailwind.config.js` (e.g., `spec-turquoise`, `spec-yellow`).
- Custom font families: `font-montserrat`, `font-dmserif`, `font-poppins` (loaded from Google Fonts in `_document.tsx`).

### Typography Components

`components/Typography/` provides `Heading` (Heading0–4, Subtitle1), `Paragraph` (Paragraph0–2), and `Text` (Text1–2) components with consistent font/size patterns. Use these instead of raw heading/paragraph tags.

### Forms

Contact form uses **Formik + Yup** for form state and validation (`components/Contact/ContactForm.tsx`).

### Dynamic Import

`GetInvolved` is loaded with `next/dynamic` and `ssr: false` because it accesses `window`.

## Key Conventions

- Components are TypeScript (`.tsx`); some utilities and constants are plain JS
- No path aliases — use relative imports
- `middleware.ts` redirects `www.` to apex domain
- `next.config.js` has `trailingSlash: true` and `images: { unoptimized: true }`
- ESLint config is minimal: just `next/core-web-vitals`
- CI runs build and lint on every push/PR (GitHub Actions) but does **not** run tests

## Known Quirks

- `ServicesAccordian.tsx` has a typo ("Accordian" instead of "Accordion") — do not rename without updating all imports
- Contentful entry ID is hardcoded in `pages/index.tsx`
- Many tests in `__tests__/` are stubs (`xit`) — test coverage is thin
