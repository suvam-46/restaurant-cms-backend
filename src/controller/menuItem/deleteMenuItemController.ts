import { Request, Response } from "express";
import prisma from "@/lib/prisma";

export const deleteMenuItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // 1. TYPE GUARD: Fixes ts(2412) by ensuring id is a string
    if (!id || typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "A valid Menu Item ID is required.",
      });
    }

    // 2. Database Operation
    // We use delete, which will throw P2025 if the ID doesn't exist
    await prisma.menuItem.delete({
      where: { id },
    });

    // 3. Success Response
    return res.status(200).json({
      success: true,
      message: "Menu item has been removed successfully.",
    });

  } catch (error: any) {
    console.error("DELETE_MENUITEM_ERROR:", error);

    // Prisma error P2025: Record to delete does not exist
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: "Menu item not found. It may have already been deleted.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the menu item.",
    });
  }
};