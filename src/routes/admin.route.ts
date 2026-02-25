import express from "express";

export const adminRouter: express.Router = express.Router();

adminRouter.post("/login", (req, res) => {
  return res.json({
    message: "Create a function for admin login and user here.",
  });
});
