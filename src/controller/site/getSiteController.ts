import { Request, Response } from "express";
import prisma from "@/lib/prisma";

/* 1. Get All Sites */
export const getAllSites = async (req: Request, res: Response) => {
  try {
    const sites = await prisma.site.findMany({
      orderBy: {
        siteName: 'asc'
      }
    });

    return res.status(200).json({
      success: true,
      count: sites.length,
      data: sites,
    });
  } catch (error) {
    console.error("Fetch all sites error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch sites",
    });
  }
};

/* 2. Get Site by ID */
export const getSiteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Type Guard: Ensures ID is strictly a string (Fixes ts(2412))
    if (!id || typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "A valid Site ID string is required.",
      });
    }

    const site = await prisma.site.findUnique({
      where: { id: id }, // ID is now guaranteed to be a string
    });

    if (!site) {
      return res.status(404).json({
        success: false,
        message: "Site configuration not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: site,
    });
  } catch (error) {
    console.error("Fetch site error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the site details.",
    });
  }
};