import express from "express";
import { categoryRoute } from "../category.route";
import { adminRouter } from "../admin.route";

export const v1Router: express.Router = express.Router();

//health check
v1Router.get("/health", (_req, res) => {
  return res
    .status(200)
    .json({ status: "OK", timestamp: new Date().toISOString() });
});

v1Router.use("/category", categoryRoute);
v1Router.use("/admin", adminRouter)