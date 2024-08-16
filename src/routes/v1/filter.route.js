import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { isATweet } from "../../middlewares/validation.js";
import { filterTweet, getTweet, getBlacklist } from "../../controllers/filter.controller.js";
const router = Router({ caseSensitive: true });

router
  .get("/", [auth, isATweet], filterTweet)
  .get("/img", [auth, isATweet], getTweet)
  .get("/blacklist", getBlacklist);

export default router;
