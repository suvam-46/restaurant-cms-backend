import prisma from "@/lib/prisma";
import express from "express";

export async function adminDelete(
  req: express.Request,
  res: express.Response
) {
  try {
    const { id } = req.params;

    const admin = await prisma.admin.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    await prisma.admin.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json({
      message: "Admin deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
}