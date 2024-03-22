import { execSync } from "node:child_process";

import { PostgreSqlContainer, StartedPostgreSqlContainer } from "@testcontainers/postgresql";

let dbContainer: StartedPostgreSqlContainer;
beforeAll(async () => {
  dbContainer = await new PostgreSqlContainer().start();
  execSync("prisma migrate dev", { env: { DATABASE_URL: dbContainer.getConnectionUri() } });
});
afterAll(async () => {
  await dbContainer.stop();
});
export { dbContainer };
