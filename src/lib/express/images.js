import express from "express";

const app = express();
app.get("/", (req, res) => {
  res.send("ASD :D");
});

export default app;
