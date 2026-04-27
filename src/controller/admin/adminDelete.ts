import express from "express";
import prisma from "@/lib/prisma";

export async function adminDelete(
  req: express.Request,
  res: express.Response
) {
  try {
    const idParam = req.params.id as string;
    if (!idParam) return res.status(400).json({ message: "Admin ID is required" });

    const adminId = parseInt(idParam, 10);
    if (isNaN(adminId)) return res.status(400).json({ message: "Invalid Admin ID format" });

    // Verify existence
    const admin = await prisma.admin.findUnique({ where: { id: adminId } });
    if (!admin) return res.status(404).json({ message: "Admin not found." });

    // Delete
    await prisma.admin.delete({ where: { id: adminId } });

    return res.status(200).json({
      message: "Admin deleted successfully"
    });

  } catch (error) {
    console.error("Delete Error:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}