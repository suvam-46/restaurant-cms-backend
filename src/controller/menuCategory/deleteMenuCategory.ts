import prisma from "@/lib/prisma";
import express from "express";

export async function updateCategoryMenu(
  req: express.Request,
  res: express.Response
) {
  try {
    const { id } = req.params;
    const { name, slug, description, image, order, isActive } = req.body;

    if (typeof id !== "string") {
      return res.status(400).json({ message: "Invalid Category ID format." });
    }

    const categoryExists = await prisma.menuCategory.findUnique({ where: { id } });
    if (!categoryExists) {
      return res.status(404).json({ message: "Menu category not found." });
    }

    if (slug && slug !== categoryExists.slug) {
      const slugTaken = await prisma.menuCategory.findUnique({ where: { slug } });
      if (slugTaken) {
        return res.status(409).json({ message: "The new slug is already in use by another category." });
      }
    }

    const updatedCategory = await prisma.menuCategory.update({
      where: { id },
      data: {
        name: name ?? categoryExists.name,
        slug: slug ?? categoryExists.slug,
        description: description ?? categoryExists.description,
        image: image ?? categoryExists.image,
        order: order !== undefined ? parseInt(order.toString(), 10) : categoryExists.order,
        isActive: isActive !== undefined ? isActive : categoryExists.isActive,
        updatedAt: new Date(), 
      },
    });

    return res.status(200).json({
      message: "Menu category updated successfully.",
      data: updatedCategory,
    });

  } catch (error) {
    console.error("Update Category Error:", error);
    return res.status(500).json({ message: "Something went wrong while updating the category." });
  }
}