import { Request, Response } from "express";
import prisma from "@/lib/prisma";

/* 1. Get All Menu Items */
// Includes the category name so you don't just see a random ID string
export const getAllMenuItems = async (req: Request, res: Response) => {
  try {
    const menuItems = await prisma.menuItem.findMany({
      include: {
        category: {
          select: {
            name: true,
            slug: true
          }
        }
      },
      orderBy: {
        item: 'asc' // Sort alphabetically by name
      }
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

/* 2. Get Single Menu Item by ID */
export const getMenuItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Type Guard: Fixes the ts(2412) error and ensures ID is a string
    if (!id || typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "A valid Menu Item ID is required.",
      });
    }

    const menuItem = await prisma.menuItem.findUnique({
      where: { id },
      include: {
        category: true // Shows all category details
      }
    });

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: menuItem,
    });
  } catch (error) {
    console.error("GET_MENUITEM_BY_ID_ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the menu item.",
    });
  }
};