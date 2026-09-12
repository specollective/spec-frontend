/**
 * Applies pending migrations and reports why if it cannot.
 *
 * `drizzle-kit migrate` exits 1 with no output at all when it fails — no
 * message, no error code — which makes a failed production migration
 * indistinguishable from a successful one that printed nothing. This uses
 * drizzle-orm's programmatic migrator over the same connection settings the
 * application itself uses, so failures surface with the PostgreSQL error.
 *
 * Run from the repository root: the migrations folder resolves against cwd.
 */
import path from "node:path";
import { config as loadEnv } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import { databaseConnection } from "../db/connection";

// Keep shell exports optional while letting deployment environment variables
// take precedence over local dotenv files.
loadEnv();
loadEnv({ path: ".env.local" });

async function main() {
  const { url, ssl } = databaseConnection();
  const pool = new Pool({
    connectionString: url,
    ssl,
    max: 1,
    connectionTimeoutMillis: 10_000,
  });

  try {
    await migrate(drizzle(pool), {
      migrationsFolder: path.resolve(process.cwd(), "db", "migrations"),
    });
    process.stdout.write("Migrations applied.\n");
  } finally {
    await pool.end().catch(() => undefined);
  }
}

type Fault = {
  message?: string;
  code?: string;
  detail?: string;
  cause?: unknown;
};

main().catch((error: unknown) => {
  process.stderr.write("Migration failed.\n");

  // drizzle-orm wraps the driver error in a "Failed query" error, so the
  // actual cause -- ECONNREFUSED, a TLS rejection, a syntax error -- is only
  // reachable through the cause chain.
  let fault = error as Fault | undefined;
  let depth = 0;
  while (fault && depth < 5) {
    if (fault.message) process.stderr.write(`  ${fault.message.split("\n")[0]}\n`);
    if (fault.code) process.stderr.write(`  postgres/system code: ${fault.code}\n`);
    if (fault.detail) process.stderr.write(`  detail: ${fault.detail}\n`);
    fault = fault.cause as Fault | undefined;
    depth += 1;
  }

  process.exitCode = 1;
});
