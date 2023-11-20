import bodyparser from "body-parser";
import compress from "compression";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import vhost from "vhost";
import { errorHandler, notFound } from "../../middlewares/error.js";
import { host, logs } from "../env.js";
import api from "./api.js";
import images from "./images.js";

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

// subdomains
app.use(vhost(`api.${host}`, api));
app.use(vhost(`i.${host}`, images));

// 404
app.use(notFound);

// Error handler
app.use(errorHandler);

export default app;
