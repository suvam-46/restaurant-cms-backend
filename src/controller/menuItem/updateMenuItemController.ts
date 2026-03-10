import { Request, Response } from "express";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const updateMenuItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // 1. Narrow the ID type (Fixes previous ts(2412) error)
    if (!id || typeof id !== "string") {
      return res.status(400).json({ success: false, message: "Valid ID required" });
    }

    // 2. Destructure inputs
    const { item, price, image, categoryId } = req.body;

    // 3. Construct the update object dynamically
    // This prevents passing 'undefined' to Prisma fields that don't want them
    const updateData: Prisma.MenuItemUpdateInput = {};

    if (item !== undefined) updateData.item = item;
    if (image !== undefined) updateData.image = image;
    
    // Handle Decimal specifically
    if (price !== undefined) {
      updateData.price = new Prisma.Decimal(price);
    }

    // Handle the Category Relationship properly
    if (categoryId !== undefined) {
      updateData.category = {
        connect: { id: categoryId }
      };
    }

    // 4. Perform the Update
    const updated = await prisma.menuItem.update({
      where: { id },
      data: updateData,
      include: { category: true }
    });

    return res.status(200).json({
      success: true,
      message: "Menu item updated",
      data: updated,
    });

  } catch (error: any) {
    console.error("UPDATE_ERROR:", error);
    if (error.code === 'P2025') return res.status(404).json({ success: false, message: "Item not found" });
    
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};