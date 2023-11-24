import database from "./lib/database.js";
import { env, host, port } from "./lib/env.js";
import app from "./lib/express/index.js";

async function createDatabaseConnection() {
  process.stdout.write("📦 [DATABASE] Connecting to the database...\n");
  try {
    await database.sequelize.authenticate();
    process.stdout.write(
      "📦 [DATABASE] Connection to the database established\n"
    );
  } catch (error) {
    process.stdout.write(
      `📦 [DATABASE] There was an error in the database ${error.message}\n`
    );
    process.exit(1);
  }
}

async function init() {
  await createDatabaseConnection();

  app.get("/", (_, res) => res.send("Helo"));

  app.listen(port, () => {
    process.stdout.write(`⚡ [SERVER] Express started in ${env} enviroment\n`);
    process.stdout.write(`⚡ [SERVER] Running in http://${host}:${port}\n`);
  });
}

init();
