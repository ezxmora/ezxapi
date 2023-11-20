import { Joi } from "express-validation";
import httpstatus from "http-status";
import ytdl from "youtube-dl-exec";

export const validEmail = {
  body: Joi.object({
    email: Joi.string().email().required(),
  }),
};

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
