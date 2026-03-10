import { Request, Response } from "express";
import prisma from "@/lib/prisma";

export const updateBanner = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // 1. TYPE GUARD: Fixes ts(2412) error by strictly narrowing 'id' to a string
    if (!id || typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "A valid Banner ID is required.",
      });
    }

    // 2. Extract update data from request body
    const { 
      bannerTitle, 
      bannerImage, 
      bannerLink, 
      buttonText 
    } = req.body;

    // 3. Database Operation: Update only the provided fields
    const updatedBanner = await prisma.banner.update({
      where: { id },
      data: {
        bannerTitle,
        bannerImage,
        bannerLink,
        buttonText,
      },
    });

    // 4. Success Response
    return res.status(200).json({
      success: true,
      message: "Banner updated successfully!",
      data: updatedBanner,
    });

  } catch (error: any) {
    console.error("UPDATE_BANNER_ERROR", error);

    // Specific error check: Prisma P2025 means record was not found
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: "Banner not found. Cannot update a non-existent record.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "An internal error occurred during the update.",
    });
  }
};