import { Request, Response } from "express";
import prisma from "@/lib/prisma";

/* 1. Get All Menu Items */
export const getAllMenuItems = async (req: Request, res: Response) => {
  try {
    const menuItems = await prisma.menuItem.findMany({
      include: {
        category: {
          select: { name: true, slug: true }
        }
      },
      orderBy: { item: 'asc' }
    });

    return res.status(200).json({
      success: true,
      count: menuItems.length,
      data: menuItems,
    });
  } catch (error) {
    console.error("GET_ALL_MENUITEMS_ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch menu items.",
    });
  }
};

/* 2. Get Menu Items by Category ID */
export const getMenuItemsByCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(400).json({ success: false, message: "Category ID is required" });
    }

    const items = await prisma.menuItem.findMany({
      where: { categoryId },
      include: { category: true },
      orderBy: { item: 'asc' }
    });

    return res.status(200).json({
      success: true,
      data: items,
    });
  } catch (error) {
    console.error("GET_BY_CATEGORY_ERROR:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch items for this category" });
  }
};

/* 3. Get Single Menu Item by ID */
export const getMenuItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || typeof id !== "string") {
      return res.status(400).json({ success: false, message: "A valid ID is required." });
    }

    const menuItem = await prisma.menuItem.findUnique({
      where: { id },
      include: { category: true }
    });

    if (!menuItem) {
      return res.status(404).json({ success: false, message: "Menu item not found." });
    }

    return res.status(200).json({ success: true, data: menuItem });
  } catch (error) {
    console.error("GET_BY_ID_ERROR:", error);
    return res.status(500).json({ success: false, message: "An error occurred" });
  }
};