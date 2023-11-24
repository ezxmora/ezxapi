import httpstatus from "http-status";
import ytdl from "youtube-dl-exec";
import database from "../lib/database.js";
const { author, quote } = database;

export const validVideoURL = async (req, res, next) => {
  const { url } = req.query;

  try {
    if (!url) {
      const err = new Error("You need to provide a valid URL");
      err.statusCode = httpstatus.BAD_REQUEST;
      throw err;
    }

    const ytdlInfo = await ytdl(url, {
      dumpSingleJson: true,
    });

    res.locals.info = ytdlInfo;
    return next();
  } catch (error) {
    return next(error);
  }
};

export const validExtension = (type) => {
  return (req, res, next) => {
    const { ext } = req.query;
    const validExtensions = {
      video: ["mp4", "webm"],
      audio: ["mp3", "ogg"],
    };

    if (!ext) {
      const err = new Error("You need to provide an extension");
      err.statusCode = httpstatus.BAD_REQUEST;
      return next(err);
    }

    if (!validExtensions[type].includes(ext)) {
      const err = new Error("You need to provide a valid extension");
      err.statusCode = httpstatus.BAD_REQUEST;
      return next(err);
    }

    return next();
  };
};

export const authorExists = async (req, _, next) => {
  const { authorId } = req.body;

  try {
    if (!authorId) {
      const err = new Error("You need to provide a authorId");
      err.statusCode = httpstatus.BAD_REQUEST;
      return next(err);
    }

    const authorExists = await author.findOne({ where: { id: authorId } });

    if (!authorExists) {
      const err = new Error("That author doesn't exist");
      err.statusCode = httpstatus.BAD_REQUEST;
      return next(err);
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

export const quoteExists = async (req, res, next) => {
  const { id } = req.body;

  if (!id) {
    const err = new Error("You need to provide an id");
    err.statusCode = httpstatus.BAD_REQUEST;
    return next(err);
  }

  const quoteExists = await quote.findOne({ where: { id } });

  if (!quoteExists) {
    const err = new Error("That quote doesn't exist");
    err.statusCode = httpstatus.BAD_REQUEST;
    return next(err);
  }

  return next();
};
