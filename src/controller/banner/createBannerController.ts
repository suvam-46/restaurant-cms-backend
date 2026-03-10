import { Request, Response } from "express";
import prisma from "@/lib/prisma";

export const createBanner = async (req: Request, res: Response) => {
  try {
    // 1. Extract data from request body
    const { 
      bannerTitle, 
      bannerImage, 
      bannerLink, 
      buttonText 
    } = req.body;

    // 2. Validation: 'bannerImage' is the only mandatory field in your Prisma model
    if (!bannerImage) {
      return res.status(400).json({
        success: false,
        message: "Banner image is required to create a banner.",
      });
    }

    // 3. Database Operation
    const newBanner = await prisma.banner.create({
      data: {
        bannerTitle: bannerTitle || null, // Optional
        bannerImage,                      // Required
        bannerLink: bannerLink || null,   // Optional
        buttonText: buttonText || null,   // Optional
      },
    });

    // 4. Success Response
    return res.status(201).json({
      success: true,
      message: "Banner created successfully!",
      data: newBanner,
    });

  } catch (error) {
    console.error("CREATE_BANNER_ERROR", error);
    
    return res.status(500).json({
      success: false,
      message: "Internal server error while creating banner.",
    });
  }
};