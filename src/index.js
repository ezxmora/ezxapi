import app from './lib/express.js';
import database from './lib/database.js';
import { port, env } from './lib/env.js';

database
  .initialize()
  .then(() => console.log('📦 [DATABASE] Connection to the database established'))
  .catch((err) => console.log(err));

app.listen(port, () => console.log(`⚡ [SERVER] Express started on port ${port} @ ${env} enviroment`));
