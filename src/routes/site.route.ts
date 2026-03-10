import express from "express";
import { updateSite } from "../controller/site/updateSiteController";
import { getAllSites } from "../controller/site/getSiteController";


export const siteRouter : express.Router = express.Router();

siteRouter.post("updateSite", updateSite)
siteRouter.get("/getSite", getAllSites)