import prisma from "@/lib/prisma";
import express from "express";

export async function createCategory(
  req: express.Request,
  res: express.Response
) {
  try {
    const { name, slug, description, image, order, isActive } = req.body;

    if (!name || !slug) {
      return res.status(400).json({ message: "Name and slug are required." });
    }

    const existingCategory = await prisma.menuCategory.findUnique({ where: { slug } });
    if (existingCategory) {
      return res.status(409).json({ message: "A category with this slug already exists." });
    }

    const category = await prisma.menuCategory.create({
      data: {
        name,
        slug,
        description: description || null,
        image: image || null,
        order: order ? parseInt(order.toString(), 10) : 0,
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    return res.status(201).json({
      message: "Menu category created successfully.",
      data: category,
    });

  } catch (error) {
    console.error("Create Category Error:", error);
    return res.status(500).json({ 
      message: "Something went wrong while creating the category.",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
}