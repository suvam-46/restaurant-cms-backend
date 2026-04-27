import express from "express";
import { createMenuItem } from "../controller/menuItem/createMenuItemController";
import { getAllMenuItems, getMenuItemsByCategory, getMenuItemById } from "../controller/menuItem/getMenuItemController";
import { updateMenuItem } from "../controller/menuItem/updateMenuItemController";
import { deleteMenuItem } from "../controller/menuItem/deleteMenuItemController";

export const menuItemRouter: express.Router = express.Router();

menuItemRouter.get("/", getAllMenuItems);
menuItemRouter.get("/category/:categoryId", getMenuItemsByCategory);
menuItemRouter.get("/:id", getMenuItemById);
menuItemRouter.post("/", createMenuItem);
menuItemRouter.patch("/:id", updateMenuItem);
menuItemRouter.delete("/:id", deleteMenuItem);
