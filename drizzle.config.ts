import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/drizzle/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST!,
    database: process.env.PGDATABASE!,
    port: Number.parseInt(process.env.PGPORT!),
    connectionString: process.env.DB_URL,
  },
});
