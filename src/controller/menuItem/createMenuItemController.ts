import { Request, Response } from "express";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const createMenuItem = async (req: Request, res: Response) => {
  try {
    const { item, price, image, categoryId } = req.body;

    // 1. Basic Validation
    if (!item || price === undefined || !categoryId) {
      return res.status(400).json({
        success: false,
        message: "Item name, price, and categoryId are required fields.",
      });
    }

    // 2. Check if Category exists first
    // This avoids a generic Prisma error and gives the user a clear message
    const categoryExists = await prisma.menuCategory.findUnique({
      where: { id: categoryId },
    });

    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "The specified category does not exist.",
      });
    }

    // 3. Database Creation
    const menuItem = await prisma.menuItem.create({
      data: {
        item,
        price: new Prisma.Decimal(price), // Explicitly handle Decimal type
        image: image || "", 
        categoryId,
      },
      // Including category name in the response is very helpful for the frontend
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    return res.status(201).json({
      success: true,
      message: "New item added to the menu.",
      data: menuItem,
    });

  } catch (error) {
    console.error("CREATE_MENUITEM_ERROR:", error);

    // Handle specific Prisma errors (like unique constraint violations)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({
        success: false,
        message: "Database error: " + error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while creating the menu item.",
    });
  }
};