import express from "express";

export const v1Router: express.Router = express.Router();

//health check
v1Router.get("/health", (_req, res) => {
  return res
    .status(200)
    .json({ status: "OK", timestamp: new Date().toISOString() });
});
