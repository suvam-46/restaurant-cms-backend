import express from "express";
import multer from "multer";
import { getAllBanners } from "../controller/banner/getBannerController";
import { createBanner } from "../controller/banner/createBannerController";
import { updateBanner } from "../controller/banner/updateBannerController";
import { deleteBanner } from "../controller/banner/deleteBannerController";

export const bannerRouter: express.Router = express.Router();
const upload = multer();

bannerRouter.get("/", getAllBanners);
bannerRouter.post("/", upload.single("bannerImage"), createBanner);
bannerRouter.patch("/:id", updateBanner);
bannerRouter.delete("/:id", deleteBanner);