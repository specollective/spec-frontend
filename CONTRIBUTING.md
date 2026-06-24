# Contributing

This guide covers development workflows beyond the basic [getting started](./README.md) steps.

## Running tests

Run the test suite with:

```bash
npm run test
```

## Running linters

Run ESLint with:

```bash
npm run lint
```

To run in CI mode to help debug failing GitHub Actions:

```bash
CI=true npm run lint
```

## Environment variables

Copy the sample env file to set up email functionality:

```bash
cp .env.sample .env.local
```

Fill in the variables as needed. Beyond the Nodemailer credentials in `.env.sample`, the app also reads:

- `CONTENTFUL_SPACE_ID` / `CONTENTFUL_ACCESS_TOKEN` — Contentful CMS (homepage hero)
- `GLQF_BASIC_AUTH_USER` / `GLQF_BASIC_AUTH_PASS` — basic-auth gate for `/glqf`
- `GIEE_BASIC_AUTH_USER` / `GIEE_BASIC_AUTH_PASS` — basic-auth gate for `/giee`

These are all read at **runtime** (by `proxy.ts` and `getServerSideProps`), so in production they must be set on the host (see [Deployment](#deployment)), not baked into the build.

## Deployment

Deployed on **DigitalOcean App Platform** (app `spec-frontend`). The app spec is committed at `.do/deploy-template.yml` (single `server` service, Ubuntu-22 buildpack); the buildpack runs `npm run build` then `npm start`. DigitalOcean redeploys automatically from GitHub — the repo's GitHub Actions (`build.yml`, `lint.yml`) only build and lint, they do **not** deploy.

Production environment variables (Contentful, Nodemailer, and the `GLQF_/GIEE_BASIC_AUTH_*` gates) are managed in the DigitalOcean dashboard:

> App Platform → `spec-frontend` → Settings → `server` component → Environment Variables (mark secrets as encrypted), then redeploy.

If a basic-auth pair is missing, that page returns `503 Basic auth not configured`.
