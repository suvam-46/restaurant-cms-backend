import prisma from "@/lib/prisma";
import express from "express";

export async function updateCategoryMenu(
  req: express.Request,
  res: express.Response
) {
  try {
    const { id } = req.params;
    const { name, slug, image } = req.body;

    // 1️⃣ Type Safety: Ensure ID is a valid string
    if (typeof id !== "string") {
      return res.status(400).json({
        message: "Invalid Category ID format.",
      });
    }

    // 2️⃣ Check if the category exists
    const categoryExists = await prisma.menuCategory.findUnique({
      where: { id },
    });

    if (!categoryExists) {
      return res.status(404).json({
        message: "Menu category not found.",
      });
    }

    // 3️⃣ Unique Slug Validation (If slug is being changed)
    if (slug && typeof slug === "string" && slug !== categoryExists.slug) {
      const slugTaken = await prisma.menuCategory.findUnique({
        where: { slug },
      });

      if (slugTaken) {
        return res.status(409).json({
          message: "The new slug is already in use by another category.",
        });
      }
    }

    // 4️⃣ Update category
    // Using '??' ensures we keep existing values if fields are missing in req.body
    const updatedCategory = await prisma.menuCategory.update({
      where: { id },
      data: {
        name: name ?? categoryExists.name,
        slug: (slug as string) ?? categoryExists.slug,
        image: image ?? categoryExists.image,
        updatedAt: new Date(), 
      },
    });

    // 5️⃣ Return success response
    return res.status(200).json({
      message: "Menu category updated successfully.",
      data: {
        id: updatedCategory.id,
        name: updatedCategory.name,
        slug: updatedCategory.slug,
        image: updatedCategory.image,
        updatedAt: updatedCategory.updatedAt,
      },
    });

  } catch (error) {
    console.error("Update Category Error:", error);
    return res.status(500).json({
      message: "Something went wrong while updating the category.",
    });
  }
}