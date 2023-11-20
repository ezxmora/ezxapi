import httpstatus from "http-status";
import { getRepository } from "../lib/util.js";

export const auth = async (req, _, next) => {
  try {
    let err;
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
      err = new Error("BAD REQUEST - You need to provide an API KEY");
      err.statusCode = httpstatus.BAD_REQUEST;
      throw err;
    }

    const keys = getRepository("Key");
    const keyExists = await keys.findOneBy({ key: apiKey });

    if (!keyExists) {
      err = new Error("BAD REQUEST - That key isn't valid.");
      err.statusCode = httpstatus.BAD_REQUEST;
      throw err;
    }

    return next();
  } catch (error) {
    return next(error);
  }
};
