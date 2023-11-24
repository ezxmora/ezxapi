import { Router } from "express";

const router = Router({ caseSensitive: true });

import authorRoutes from "./author.route.js";
import keyRoutes from "./key.route.js";
import quoteRoures from "./quote.route.js";
import ytdlRoutes from "./ytdl.route.js";

router.get("/status", (_, res) =>
  res.json({ status: 200, message: "Up and running 🚂" })
);

router
  .use("/author", authorRoutes)
  .use("/key", keyRoutes)
  .use("/quote", quoteRoures)
  .use("/ytdl", ytdlRoutes);

export default router;
