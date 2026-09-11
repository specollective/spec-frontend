import { config as loadEnv } from "dotenv";
import { defineConfig } from "drizzle-kit";
import { databaseConnection } from "./db/connection";

// Keep shell exports optional while letting deployment environment variables
// take precedence over local dotenv files.
loadEnv();
loadEnv({ path: ".env.local" });

// `generate` and `check` never open a connection; only `migrate` needs real
// credentials, and it fails loudly through databaseConnection() if unset.
const dbCredentials = process.env.DATABASE_URL
  ? databaseConnection()
  : { url: "" };

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dbCredentials,
});
