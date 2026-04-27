import express from "express";
import { handleUpload } from "../controller/upload/uploadController";

export const uploadRouter: express.Router = express.Router();

uploadRouter.post("/", handleUpload);
