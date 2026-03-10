import { Request, Response } from "express";
import prisma from "@/lib/prisma";

export const deleteBanner = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // 1. TYPE GUARD: Ensures ID is a string to satisfy Prisma's where clause
    if (!id || typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "A valid Banner ID is required for deletion.",
      });
    }

    // 2. Database Operation: Delete the banner
    await prisma.banner.delete({
      where: { id },
    });

    // 3. Success Response
    return res.status(200).json({
      success: true,
      message: "Banner deleted successfully.",
    });

  } catch (error: any) {
    console.error("DELETE_BANNER_ERROR", error);

    // Prisma error P2025: Record to delete does not exist
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: "Banner not found. It may have already been deleted.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "An internal error occurred while trying to delete the banner.",
    });
  }
};