import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { databaseConnection } from "./connection";
import * as schema from "./schema";

let db: NodePgDatabase<typeof schema> | undefined;

export function getDb(): NodePgDatabase<typeof schema> {
  if (db) return db;

  const { url, ssl } = databaseConnection();
  const pool = new Pool({
    connectionString: url,
    ssl,
    max: 5,
    connectionTimeoutMillis: 3000,
    idleTimeoutMillis: 30000,
    // Every counter is keyed by UTC day. Pinning the session timezone on the
    // connection removes the per-request `SET LOCAL TIME ZONE` round trip.
    options: "-c timezone=UTC",
  });

  db = drizzle(pool, { schema });
  return db;
}
