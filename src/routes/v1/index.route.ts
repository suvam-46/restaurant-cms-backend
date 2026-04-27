import express from "express";
import { categoryRoute } from "../category.route";
import { adminRouter } from "../admin.route";
import { siteRouter } from "../site.route";
import { bannerRouter } from "../banner.route";
import { menuItemRouter } from "../menuItem.route";
import { uploadRouter } from "../upload.route";

export const v1Router: express.Router = express.Router();

//health check
v1Router.get("/health", (_req, res) => {
  return res
    .status(200)
    .json({ status: "OK", timestamp: new Date().toISOString() });
});

v1Router.use("/category", categoryRoute);
v1Router.use("/admin", adminRouter)
v1Router.use("/site", siteRouter)
v1Router.use("/banner", bannerRouter)
v1Router.use("/menu-item", menuItemRouter)
v1Router.use("/upload", uploadRouter)