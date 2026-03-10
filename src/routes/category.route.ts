import express from "express";

export const categoryRoute: express.Router = express.Router();

categoryRoute.get("/", () => {
  return null;
});
