import prisma from "@/lib/prisma";
import express from "express";

export async function getAllCategories(
  req: express.Request,
  res: express.Response
) {
  try {
    const categories = await prisma.menuCategory.findMany({
      orderBy: [
        { order: "asc" }, 
        { name: "asc" },  
      ],
      include: {
        _count: {
          select: { menuItem: true }, 
        },
      },
    });

    return res.status(200).json({
      message: "Categories fetched successfully.",
      data: categories,
    });
  } catch (error) {
    console.error("Get All Categories Error:", error);
    return res.status(500).json({
      message: "Something went wrong while fetching categories.",
    });
  }
}

export async function getCategoryByIdOrSlug(
  req: express.Request,
  res: express.Response
) {
  try {
    const { identifier } = req.params;

    if (typeof identifier !== "string") {
      return res.status(400).json({
        message: "Invalid category identifier format.",
      });
    }

    const category = await prisma.menuCategory.findFirst({
      where: {
        OR: [
          { id: identifier },
          { slug: identifier },
        ],
      },
      include: {
        menuItem: true, // Automatically includes all food items belonging to this category
      },
    });

    if (!category) {
      return res.status(404).json({
        message: "Category not found.",
      });
    }

    return res.status(200).json({
      message: "Category fetched successfully.",
      data: category,
    });
  } catch (error) {
    console.error("Get Single Category Error:", error);
    return res.status(500).json({
      message: "Something went wrong while fetching the category.",
    });
  }
}