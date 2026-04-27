import express from "express";
import { updateSite } from "../controller/site/updateSiteController";
import { getAllSites } from "../controller/site/getSiteController";

export const siteRouter: express.Router = express.Router();

siteRouter.get("/", getAllSites);
siteRouter.post("/", updateSite);