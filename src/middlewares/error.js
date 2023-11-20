import httpstatus from "http-status";
import { env } from "../lib/env.js";

export const errorHandler = (err, req, res, _) => {
  const errStatus = err.statusCode || httpstatus.INTERNAL_SERVER_ERROR;
  const errMsg = err.message || "Something went wrong :(";

  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: env !== "dev" ? err.stack : undefined,
  });
};

export const notFound = (_, res) => {
  res.status(httpstatus.NOT_FOUND).json({
    success: false,
    message: "That route doesn't exist :(",
    status: httpstatus.NOT_FOUND,
  });
};
