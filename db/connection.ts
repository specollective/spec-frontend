import type { ConnectionOptions } from "node:tls";

export type DatabaseConnection = {
  url: string;
  ssl: ConnectionOptions | false;
};

/**
 * Single source of truth for how this application reaches PostgreSQL. Shared by
 * the runtime pool (`db/client.ts`) and the migrator (`drizzle.config.ts`) so
 * TLS behaviour can never drift between them.
 */
export function databaseConnection(): DatabaseConnection {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured");
  }

  const url = new URL(process.env.DATABASE_URL);
  // pg lets URI ssl parameters override the explicit SSL object below.
  url.searchParams.delete("sslmode");

  return {
    url: url.toString(),
    ssl:
      process.env.NODE_ENV === "production"
        ? { ca: process.env.DATABASE_SSL_CA, rejectUnauthorized: true }
        : false,
  };
}
