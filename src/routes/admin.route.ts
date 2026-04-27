import express from "express";
import { adminLogin } from "../controller/admin/adminLogin";
import { adminRegister } from "../controller/admin/adminRegister";
import { adminUpdate } from "../controller/admin/adminUpdate";
import { adminDelete } from "../controller/admin/adminDelete";

export const adminRouter: express.Router = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.post("/register", adminRegister)
adminRouter.put("/updateAdmin/:id", adminUpdate)
adminRouter.delete('/deleteAdmin/:id', adminDelete);

