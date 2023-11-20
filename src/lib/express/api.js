import express from "express";
import routes from "../../routes/v1/index.js";

const app = express();
app.use("/v1", routes);

export default app;
