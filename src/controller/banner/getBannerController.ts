import { Request, Response } from "express";
import prisma from "@/lib/prisma";

/* 1. Get All Banners (Public) */
export const getAllBanners = async (req: Request, res: Response) => {
  try {
    // We sort by 'createdAt' descending so the newest banners appear first
    const banners = await prisma.banner.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.status(200).json({
      success: true,
      count: banners.length,
      data: banners,
    });
  } catch (error) {
    console.error("GET_ALL_BANNERS_ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch banners.",
    });
  }
};

/* 2. Get Single Banner by ID (Admin/Public) */
export const getBannerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Type Guard: Fixes the ts(2412) error by ensuring ID is a string
    if (!id || typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "A valid Banner ID is required.",
      });
    }

    const banner = await prisma.banner.findUnique({
      where: { id },
    });

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: banner,
    });
  } catch (error) {
    console.error("GET_BANNER_BY_ID_ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the banner details.",
    });
  }
};