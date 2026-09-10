const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { Pool } = require("pg");
const dotenv = require("dotenv");

const LOCAL_CONTAINER = "spec-giee-postgres";
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

function ensureLocalPostgres() {
  if (!isDefaultLocalDatabase()) return;

  const inspect = spawnSync(
    "docker",
    ["inspect", "-f", "{{.State.Running}}", LOCAL_CONTAINER],
    { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }
  );
  if (inspect.status === 0 && inspect.stdout.trim() === "true") return;

  if (inspect.status === 0) {
    const started = spawnSync("docker", ["start", LOCAL_CONTAINER], {
      stdio: "inherit",
    });
    if (started.status !== 0) throw new Error("Could not start Docker PostgreSQL");
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
      "POSTGRES_DB=giee_analytics",
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

async function waitForDatabase(pool) {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      await pool.query("SELECT 1");
      return;
    } catch (error) {
      if (attempt === 29) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is required. Configure it in .env.local or the environment."
    );
  }

  ensureLocalPostgres();

  const migration = fs.readFileSync(
    path.join(__dirname, "..", "db", "migrations", "001_giee_page_views.sql"),
    "utf8"
  );
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 1,
    connectionTimeoutMillis: 5000,
    ssl:
      process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: true }
        : false,
  });

  try {
    await waitForDatabase(pool);
    await pool.query("SET TIME ZONE 'UTC'");
    await pool.query(migration);
    process.stdout.write("GIEE analytics database is ready.\n");
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  process.stderr.write(`GIEE analytics database setup failed: ${error.message}\n`);
  process.exitCode = 1;
});
