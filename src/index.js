import database from "./lib/database.js";
import { env, host, port } from "./lib/env.js";
import app from "./lib/express/index.js";

database
  .initialize()
  .then(() =>
    process.stdout.write(
      "📦 [DATABASE] Connection to the database established\n"
    )
  )
  .catch((err) =>
    process.stdout.write(
      `📦 [DATABASE] There was an error in the database ${err.message}\n`
    )
  );

app.get("/", (_, res) => res.send("Helo"));

app.listen(port, () => {
  process.stdout.write(`⚡ [SERVER] Express started in ${env} enviroment\n`);
  process.stdout.write(`⚡ [SERVER] Running in http://${host}:${port}\n`);
});
