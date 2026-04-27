import { Request, Response } from "express";
import prisma from "@/lib/prisma";

export const updateSite = async (req: Request, res: Response) => {
  try {
    const { 
      siteLogo, 
      siteName, 
      siteURL, 
      description, 
      contactEmail, 
      contactPhone, 
      address 
    } = req.body;

    // VALIDATION: Ensure required fields are not just empty strings or null
    if (!siteName || !siteLogo) {
      return res.status(400).json({
        success: false,
        message: "Site Name and Site Logo are required.",
      });
    }

    // Check if any site record exists
    const existingSite = await prisma.site.findFirst();

    let result;
    if (existingSite) {
      // Update the existing record
      result = await prisma.site.update({
        where: { id: existingSite.id },
        data: {
          siteLogo,
          siteName,
          siteURL: siteURL || null,
          description: description || null,
          contactEmail: contactEmail || null,
          contactPhone: contactPhone || null,
          address: address || null,
        },
      });
    } else {
      // Create the first record
      result = await prisma.site.create({
        data: {
          siteLogo,
          siteName,
          siteURL: siteURL || null,
          description: description || null,
          contactEmail: contactEmail || null,
          contactPhone: contactPhone || null,
          address: address || null,
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: existingSite ? "Site updated successfully" : "Site created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Site Save Error:", error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to save site settings.",
    });
  }
};