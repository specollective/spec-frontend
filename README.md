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

Fill in the variables as needed
