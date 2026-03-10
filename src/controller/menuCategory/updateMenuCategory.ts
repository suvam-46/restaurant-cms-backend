import prisma from "@/lib/prisma";
import express from "express";

export async function deleteCategoryMenu(
  req: express.Request,
  res: express.Response
) {
  try {
    const { id } = req.params;

    // 1️⃣ Type Safety: Ensure ID is a valid string
    if (!id || typeof id !== "string") {
      return res.status(400).json({
        message: "A valid Category ID is required for deletion.",
      });
    }

    const categoryExists = await prisma.menuCategory.findUnique({
      where: { id },
    });

    if (!categoryExists) {
      return res.status(404).json({
        message: "Menu category not found.",
      });
    }

    // 3️⃣ Delete the category
    // Note: If you have MenuItems linked, ensure your Prisma schema 
    // has 'onDelete: Cascade' or delete the items first.
    await prisma.menuCategory.delete({
      where: { id },
    });

    // 4️⃣ Return success response
    return res.status(200).json({
      message: "Menu category deleted successfully.",
      data: {
        id: categoryExists.id,
        name: categoryExists.name,
        slug: categoryExists.slug,
      },
    });

  } catch (error) {
    console.error("Delete Category Error:", error);
    return res.status(500).json({
      message: "Something went wrong while deleting the category.",
    });
  }
}