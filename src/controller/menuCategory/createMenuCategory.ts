import prisma from "@/lib/prisma";
import express from "express";

export async function createCategory(
  req: express.Request,
  res: express.Response
) {
  try {
    const { name, slug, image } = req.body;

    // 1️⃣ Basic validation
    if (!name || !slug) {
      return res.status(400).json({
        message: "Name and slug are required.",
      });
    }

    // 2️⃣ Check if category slug already exists
    const existingCategory = await prisma.menuCategory.findUnique({
      where: { slug },
    });

    if (existingCategory) {
      return res.status(409).json({
        message: "A category with this slug already exists.",
      });
    }

    // 3️⃣ Create category
    const category = await prisma.menuCategory.create({
      data: {
        name,
        slug,
        image, // This can be null if not provided
      },
    });

    // 4️⃣ Return success response
    return res.status(201).json({
      message: "Menu category created successfully.",
      data: {
        id: category.id,
        name: category.name,
        slug: category.slug,
        image: category.image,
        createdAt: category.createdAt,
      },
    });

  } catch (error) {
    console.error("Create Category Error:", error);
    return res.status(500).json({
      message: "Something went wrong while creating the category.",
    });
  }
}