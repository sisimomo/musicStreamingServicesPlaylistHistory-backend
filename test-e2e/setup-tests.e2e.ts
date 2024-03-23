import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import { PostgreSqlContainer, StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import postgres from "postgres";

// If it were feasible, I'd opt for the execution or the execSync("prisma migrate dev", { ... }) command.
// Unfortunately, this approach encounters issues in the GitHub Workflow.
const runMigrationScripts = async (dbContainer: StartedPostgreSqlContainer): Promise<void> => {
  const migrationsDir = path.join(process.cwd(), "prisma/migrations");
  const migrationFiles = fs
    .readdirSync(migrationsDir)
    .map(file => path.join(migrationsDir, file))
    .filter(filePath => fs.statSync(filePath).isFile())
    .filter(filePath => filePath.endsWith(".sql"))
    .sort();

  const sql = postgres(dbContainer.getConnectionUri());

  for (const filePath of migrationFiles) {
    const query: string = fs.readFileSync(filePath, "utf8");
    await sql.unsafe(query);
  }

  await sql.end();
};

let dbContainer: StartedPostgreSqlContainer;

export const startAndInitializeDbContainer = async (): Promise<void> => {
  dbContainer = await new PostgreSqlContainer().start();
  await runMigrationScripts(dbContainer);
  process.env["DATABASE_URL"] = dbContainer.getConnectionUri();
};

export const stopDbContainer = async (): Promise<void> => {
  await dbContainer.stop();
};
