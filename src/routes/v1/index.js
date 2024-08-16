import { Router } from "express";

const router = Router({ caseSensitive: true });

import authorRoutes from "./author.route.js";
import keyRoutes from "./key.route.js";
import quoteRoutes from "./quote.route.js";
import ytdlRoutes from "./ytdl.route.js";
import filterRoutes from "./filter.route.js";

router.get("/status", (_, res) =>
  res.json({ status: 200, message: "Up and running 🚂" })
);

router
  .use("/author", authorRoutes)
  .use("/key", keyRoutes)
  .use("/quote", quoteRoutes)
  .use("/ytdl", ytdlRoutes)
  .use("/filter", filterRoutes);

export default router;
