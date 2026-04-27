import { Request, Response } from "express";
import prisma from "@/lib/prisma";

export const createBanner = async (req: Request, res: Response) => {
  try {
    // 1. Text fields are in req.body
    const { bannerTitle, bannerLink, buttonText } = req.body;

    // 2. The image is now in req.file (because of Multer)
    // If you are sending a URL as text, it stays in req.body
    const bannerImage = req.file ? req.file.originalname : req.body.bannerImage;

    // 3. Validation
    if (!bannerImage) {
      return res.status(400).json({
        success: false,
        message: "Banner image is required to create a banner.",
      });
    }

    // 4. Database Operation
    const newBanner = await prisma.banner.create({
      data: {
        bannerTitle: bannerTitle || null,
        bannerImage: bannerImage, // This now has a value!
        bannerLink: bannerLink || null,
        buttonText: buttonText || null,
      },
    });

    return res.status(201).json({
      success: true,
      data: newBanner,
    });
  } catch (error) {
    console.error("CREATE_BANNER_ERROR", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
