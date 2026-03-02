# SPEC Frontend

# Start local dev server on port 3000
dev:
    npm run dev

# Production build
build:
    npm run build

# Run ESLint
lint:
    npm run lint

# Run all tests
test:
    npm run test

# Run tests in watch mode
test-watch:
    npm run test -- --watch

# Run a single test file
test-file file:
    npm run test -- {{file}}

# Start production server (default port 8080)
start:
    npm run start

# Install dependencies
install:
    npm install

# Build and export static site
export:
    npm run export

# Copy .env.sample to .env.local
setup-env:
    cp .env.sample .env.local
