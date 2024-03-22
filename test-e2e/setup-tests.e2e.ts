import { execSync } from "node:child_process";

import { PostgreSqlContainer, StartedPostgreSqlContainer } from "@testcontainers/postgresql";

let dbContainer: StartedPostgreSqlContainer;
beforeAll(async () => {
  //connect our container
  dbContainer = await new PostgreSqlContainer().start();
  // Execute Prisma migrations
  execSync("npx prisma migrate dev", { env: { DATABASE_URL: dbContainer.getConnectionUri() } });
});
afterAll(async () => {
  //Stop container as well as postgresClient
  await dbContainer.stop();
});
export { dbContainer };
