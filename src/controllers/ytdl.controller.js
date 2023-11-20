import fs from "fs";
import ytdl from "youtube-dl-exec";
import { randomString } from "../lib/util.js";

export const getInfo = (req, res, next) => {
  const { id, title, uploader, thumbnail, url } = res.locals.info;

  res.json({ id, title, uploader, thumbnail, url });

  return { id, title, uploader, thumbnail, url };
};

export const getVideo = async (req, res, next) => {
  const { url, ext } = req.query;
  const filename = `${randomString()}.${ext}`;
  const fileRoute = `./media/${filename}`;

  try {
    await ytdl(url, {
      format: `bestvideo[ext=${ext}]+bestaudio/best[ext=${ext}]/best`,
      maxFilesize: "50M",
      output: fileRoute,
      restrictFilenames: true,
    });

    res.download(fileRoute, filename, function (err) {
      if (err) {
        throw err;
      } else {
        fs.unlinkSync(fileRoute);
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getAudio = async (req, res, next) => {
  const { url, ext } = req.query;
  const filename = `${randomString()}.${ext}`;
  const fileRoute = `./videos/${filename}`;

  try {
    await ytdl(url, {
      output: fileRoute,
      restrictFilenames: true,
      extractAudio: true,
      audioFormat: ext,
    });

    res.download(fileRoute, filename, function (err) {
      if (err) {
        throw err;
      } else {
        fs.unlinkSync(fileRoute);
      }
    });
  } catch (error) {
    next(error);
  }
};
