import * as url from 'url';
import path from 'path';
import dotenv from 'dotenv-safe';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

dotenv.config({
  path: path.join(__dirname, '../../.env'),
  example: path.join(__dirname, '../../.env.example')
});

export const env = process.env.NODE_ENV;
export const port = process.env.PORT;
export const logs = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
export const dbHost = process.env.DB_HOST;
export const dbPort = process.env.DB_PORT;
export const dbUser = process.env.DB_USER;
export const dbPass = process.env.DB_PASS;
