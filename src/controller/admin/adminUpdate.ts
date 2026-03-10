import prisma from "@/lib/prisma";
import express from "express";
import bcrypt from "bcrypt";

export async function adminUpdate(
  req: express.Request,
  res: express.Response
) {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;

    const admin = await prisma.admin.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found.",
      });
    }

    let hashedPassword = admin.password;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedAdmin = await prisma.admin.update({
      where: {
        id: Number(id),
      },
      data: {
        username: username ?? admin.username,
        email: email ?? admin.email,
        password: hashedPassword,
      },
    });

    return res.status(200).json({
      message: "Admin updated successfully",
      data: {
        id: updatedAdmin.id,
        username: updatedAdmin.username,
        email: updatedAdmin.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
}