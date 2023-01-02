import express from 'express';
import bodyparser from 'body-parser';
import morgan from 'morgan';
import compress from 'compression';
import helmet from 'helmet';
import routes from '../routes/v1/index.js';
import { logs } from './env.js';
import { notFound, errorHandler } from '../middlewares/error.js';

const app = express();

// request logging. dev: console | production: file
app.use(morgan(logs));

// parse body params and attach them to req.body
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// gzip compression
app.use(compress());

// sets various HTTP headers
app.use(helmet());

// routes
app.use('/api/v1', routes);

// 404
app.use(notFound);

// Error handler
app.use(errorHandler);

export default app;
