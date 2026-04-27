import cloudinary from "../configs/cloudinary.config";

export const uploadToCloudinary = async (fileStr: string, folder: string = "restaurant-cms") => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      folder: folder,
      resource_type: "auto",
    });
    return uploadResponse.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};
