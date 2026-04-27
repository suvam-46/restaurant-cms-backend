import { Request, Response } from "express";
import { uploadToCloudinary } from "../../utils/cloudinary.util";

export const handleUpload = async (req: Request, res: Response) => {
  try {
    const { image } = req.body;

    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
      return res.status(500).json({ 
        success: false, 
        message: `Cloudinary Config Missing: ${process.env.CLOUDINARY_CLOUD_NAME ? 'Keys exist' : 'Cloud name empty'}` 
      });
    }

    if (!image) {
      return res.status(400).json({ success: false, message: "No image provided" });
    }

    const imageUrl = await uploadToCloudinary(image);

    return res.status(200).json({
      success: true,
      url: imageUrl,
    });
  } catch (error) {
    console.error("Upload Controller Error:", error);
    // Return the actual message from Cloudinary for debugging
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Cloudinary upload failed",
      debug: error
    });
  }
};
