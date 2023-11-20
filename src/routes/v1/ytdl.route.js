import { Router } from "express";
import {
  getAudio,
  getInfo,
  getVideo,
} from "../../controllers/ytdl.controller.js";
import { validExtension, validVideoURL } from "../../middlewares/validation.js";

const router = Router({ caseSensitive: true });

router
  .get("/info", [validVideoURL], getInfo)
  .get("/video", [validVideoURL, validExtension("video")], getVideo)
  .get("/audio", [validVideoURL, validExtension("audio")], getAudio);

export default router;
