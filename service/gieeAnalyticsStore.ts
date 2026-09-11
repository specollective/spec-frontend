import { Pool } from "pg";

let pool: Pool | undefined;

function getPool(): Pool {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured");
  }

  pool ??= new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5,
    connectionTimeoutMillis: 3000,
    idleTimeoutMillis: 30000,
    ssl:
      process.env.NODE_ENV === "production"
        ? {
            ca: process.env.DATABASE_SSL_CA,
            rejectUnauthorized: true,
          }
        : false,
  });
  return pool;
}

export async function recordGieePageView(
  path: string,
  locale: string
): Promise<void> {
  const client = await getPool().connect();
  try {
    await client.query("BEGIN");
    await client.query("SET LOCAL TIME ZONE 'UTC'");
    await client.query(
      `INSERT INTO giee_page_views (day, path, locale, views)
       VALUES (CURRENT_DATE, $1, $2, 1)
       ON CONFLICT (day, path, locale)
       DO UPDATE SET views = giee_page_views.views + 1`,
      [path, locale]
    );
    await client.query(
      `DELETE FROM giee_page_views
       WHERE day < CURRENT_DATE - INTERVAL '90 days'`
    );
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK").catch(() => undefined);
    throw error;
  } finally {
    client.release();
  }
}
