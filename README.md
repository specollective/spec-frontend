# SPEC Frontend

Frontend for [specollective.org](specollective.org) powered [Next.js](https://nextjs.org/) and bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Ensure you have NodeJS version v18.8.0 installed. We recommend using [nvm](https://github.com/nvm-sh/nvm) to manage node version.

To start the development environment install the dependencies and run the development server command:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running tests

To run the test suite run 

```
npm run test
```

## Running linters

To run ESLINT use the command 

```
npm run lint
```

To run in CI mode to help with debugging Github Action failing

```
CI=true npm run lint
```

## Updating environment variables

To copy over env variables needed for email functionality

```
cp .env.sample .env.local
```

Fill in the variables as needed.

Beyond the Nodemailer credentials in `.env.sample`, the app also reads:

- `CONTENTFUL_SPACE_ID` / `CONTENTFUL_ACCESS_TOKEN` — Contentful CMS (homepage hero)
- `GLQF_BASIC_AUTH_USER` / `GLQF_BASIC_AUTH_PASS` — basic-auth gate for `/glqf`
- `GIEE_BASIC_AUTH_USER` / `GIEE_BASIC_AUTH_PASS` — basic-auth gate for `/giee`

These are all read at **runtime** (by `proxy.ts` and `getServerSideProps`), so in production they must be set on the host (see Deployment), not baked into the build.

## Deployment

Deployed on **DigitalOcean App Platform** (app `spec-frontend`). The app spec is committed at `.do/deploy-template.yml` (single `server` service, Ubuntu-22 buildpack); the buildpack runs `npm run build` then `npm start`. DigitalOcean redeploys automatically from GitHub — the repo's GitHub Actions (`build.yml`, `lint.yml`) only build and lint, they do **not** deploy.

Production environment variables (Contentful, Nodemailer, and the `GLQF_/GIEE_BASIC_AUTH_*` gates) are managed in the DigitalOcean dashboard:

> App Platform → `spec-frontend` → Settings → `server` component → Environment Variables (mark secrets as encrypted), then redeploy.

If a basic-auth pair is missing, that page returns `503 Basic auth not configured`.
