const { spawnSync } = require("child_process");
const path = require("path");
const { Client } = require("pg");
const dotenv = require("dotenv");

const LOCAL_CONTAINER = "spec-analytics-postgres";
// Container name from before analytics was generalized beyond GIEE. It is
// adopted by rename in ensureLocalPostgres() so existing local data survives.
const LEGACY_CONTAINER = "spec-giee-postgres";
const LOCAL_PORT = "54329";

// Keep shell exports optional while allowing deployment environment variables
// to take precedence over local dotenv files.
dotenv.config();
dotenv.config({ path: ".env.local" });

function isDefaultLocalDatabase() {
  if (process.env.NODE_ENV === "production") return false;
  if (!process.env.DATABASE_URL) return false;

  const databaseUrl = new URL(process.env.DATABASE_URL);
  return (
    ["localhost", "127.0.0.1", "[::1]"].includes(databaseUrl.hostname) &&
    (databaseUrl.port || "5432") === LOCAL_PORT
  );
}

function localDatabaseName() {
  return new URL(process.env.DATABASE_URL).pathname.replace(/^\//, "");
}

function containerState(name) {
  const inspect = spawnSync(
    "docker",
    ["inspect", "-f", "{{.State.Running}}", name],
    { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }
  );
  if (inspect.status !== 0) return "missing";
  return inspect.stdout.trim() === "true" ? "running" : "stopped";
}

function startContainer(name) {
  const started = spawnSync("docker", ["start", name], { stdio: "inherit" });
  if (started.status !== 0) {
    throw new Error(`Could not start the ${name} container`);
  }
}

/** True for a container that was created but never actually ran, so it holds no data. */
function neverStarted(name) {
  const inspect = spawnSync(
    "docker",
    ["inspect", "-f", "{{.State.StartedAt}}", name],
    { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }
  );
  return inspect.status === 0 && inspect.stdout.trim().startsWith("0001-01-01");
}

function ensureLocalPostgres() {
  if (!isDefaultLocalDatabase()) return;

  let state = containerState(LOCAL_CONTAINER);

  // A container left behind by a run that failed on the port bind holds no
  // data. Clear it so the legacy container still holding the port can be
  // adopted below instead of dying on an unstartable shell.
  if (
    state !== "missing" &&
    neverStarted(LOCAL_CONTAINER) &&
    containerState(LEGACY_CONTAINER) !== "missing"
  ) {
    spawnSync("docker", ["rm", "-f", LOCAL_CONTAINER], { stdio: "ignore" });
    state = "missing";
  }

  if (state === "running") return;
  if (state === "stopped") {
    startContainer(LOCAL_CONTAINER);
    return;
  }

  // Adopt the container from before analytics was generalized beyond GIEE
  // rather than asking anyone to delete it: it holds the same PostgreSQL data
  // directory and still owns the port, so renaming is both cheaper and safer
  // than a destroy-and-recreate. ensureLocalDatabase() creates the database
  // DATABASE_URL now points at if the old name differs.
  if (containerState(LEGACY_CONTAINER) !== "missing") {
    process.stdout.write(
      `Renaming the ${LEGACY_CONTAINER} container to ${LOCAL_CONTAINER}...\n`
    );
    const renamed = spawnSync("docker", ["rename", LEGACY_CONTAINER, LOCAL_CONTAINER], {
      stdio: "inherit",
    });
    if (renamed.status !== 0) {
      throw new Error(
        `Could not rename ${LEGACY_CONTAINER}. Remove it with ` +
          `\`docker rm -f ${LEGACY_CONTAINER}\` and run this again.`
      );
    }
    if (containerState(LOCAL_CONTAINER) !== "running") startContainer(LOCAL_CONTAINER);
    return;
  }

  const created = spawnSync(
    "docker",
    [
      "run",
      "--name",
      LOCAL_CONTAINER,
      "-e",
      "POSTGRES_PASSWORD=local",
      "-e",
      // Create whatever database DATABASE_URL asks for instead of a second
      // hardcoded name that could drift from it.
      `POSTGRES_DB=${localDatabaseName()}`,
      "-p",
      `${LOCAL_PORT}:5432`,
      "-d",
      "postgres:16",
    ],
    { stdio: "inherit" }
  );
  if (created.status !== 0) {
    throw new Error(
      "Could not start local PostgreSQL. Install Docker or configure DATABASE_URL for an existing database."
    );
  }
}

/**
 * Connects to the maintenance database and creates the one DATABASE_URL names
 * if it is absent. Needed when an adopted container was initialized with a
 * different database name than the one now configured.
 */
async function ensureLocalDatabase() {
  if (!isDefaultLocalDatabase()) return;

  const name = localDatabaseName();
  const maintenanceUrl = new URL(process.env.DATABASE_URL);
  maintenanceUrl.pathname = "/postgres";

  const client = await connectWithRetry(maintenanceUrl);
  try {
    const existing = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [name]
    );
    if (existing.rowCount === 0) {
      process.stdout.write(`Creating the ${name} database...\n`);
      // Identifiers cannot be parameterized; quote the name instead.
      await client.query(`CREATE DATABASE "${name.replace(/"/g, '""')}"`);
    }
  } finally {
    await client.end().catch(() => undefined);
  }
}
/** Opens a connection, retrying while the server finishes starting up. */
async function connectWithRetry(url) {
  const target = new URL(url);
  // pg lets URI ssl parameters override the explicit SSL setting below.
  target.searchParams.delete("sslmode");

  let lastError;
  for (let attempt = 0; attempt < 30; attempt += 1) {
    const client = new Client({
      connectionString: target.toString(),
      connectionTimeoutMillis: 5000,
      ssl:
        process.env.NODE_ENV === "production"
          ? { ca: process.env.DATABASE_SSL_CA, rejectUnauthorized: true }
          : false,
    });
    try {
      await client.connect();
      return client;
    } catch (error) {
      lastError = error;
      await client.end().catch(() => undefined);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  throw lastError;
}

async function waitForDatabase() {
  const client = await connectWithRetry(process.env.DATABASE_URL);
  await client.end().catch(() => undefined);
}
async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is required. Configure it in .env.local or the environment."
    );
  }

  ensureLocalPostgres();
  await ensureLocalDatabase();
  await waitForDatabase();

  // Migrations own schema changes and their own applied ledger, so this
  // script never issues DDL itself. Application startup never migrates.
  const migrated = spawnSync(
    process.platform === "win32" ? "npm.cmd" : "npm",
    ["run", "--silent", "db:migrate"],
    { stdio: "inherit", cwd: path.join(__dirname, "..") }
  );
  if (migrated.status !== 0) {
    throw new Error("Migration failed");
  }

  process.stdout.write("Analytics database is ready.\n");
}

main().catch((error) => {
  process.stderr.write(`Analytics database setup failed: ${error.message}\n`);
  process.exitCode = 1;
});
