const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");
const dotenv = require("dotenv");

// Keep shell exports optional while allowing deployment environment variables
// to take precedence over local dotenv files.
dotenv.config();
dotenv.config({ path: ".env.local" });

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is required. Configure it in .env.local or the environment."
    );
  }

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
