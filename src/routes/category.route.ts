import express from "express";
import { getAllCategories } from "../controller/menuCategory/getMenuCategory";
import { createCategory } from "../controller/menuCategory/createMenuCategory";
import { updateCategoryMenu } from "../controller/menuCategory/deleteMenuCategory"; // Yes, it's in the delete file
import { deleteCategoryMenu } from "../controller/menuCategory/updateMenuCategory"; // Yes, it's in the update file

export const categoryRoute: express.Router = express.Router();

categoryRoute.get("/", getAllCategories);
categoryRoute.post("/", createCategory);
categoryRoute.patch("/:id", updateCategoryMenu);
categoryRoute.delete("/:id", deleteCategoryMenu);
