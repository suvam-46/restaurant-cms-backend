import { Request, Response } from "express";
import prisma from "@/lib/prisma";

/* Update site */
export const updateSite = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // 1. TYPE GUARD: This solves the ts(2412) error.
    // By checking if it's a string, we guarantee to TS that it's not string[] or undefined.
    if (!id || typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "A valid Site ID string is required.",
      });
    }

    // 2. Destructure body for cleaner code
    const { 
      siteLogo, 
      siteName, 
      siteURL, 
      description, 
      contactEmail, 
      contactPhone, 
      address 
    } = req.body;

    const updated = await prisma.site.update({
      where: { id: id }, // Now TS is certain 'id' is a string
      data: {
        siteLogo,
        siteName,
        siteURL,
        description,
        contactEmail,
        contactPhone,
        address,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Site updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({
      success: false,
      message: "Update failed. Make sure the record exists.",
    });
  }
};  