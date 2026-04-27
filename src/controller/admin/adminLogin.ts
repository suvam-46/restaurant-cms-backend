import prisma from "@/lib/prisma";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { EnvConfig } from "@/configs/env.config";

export async function adminLogin(req: express.Request, res: express.Response) {
  const { email, password } = req.body;

  const admin = await prisma.admin.findUnique({
    where: { email: email },
  });

  if (!admin) {
    return res.status(404).json({ message: "Admin not found." });
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid Credentials." });
  }

  const token = jwt.sign(
    { adminId: admin.id, username: admin.username, email: admin.email },
    EnvConfig.JWT_SECRET,
  );

  return res.status(200).json({
    message: "Admin logged in successfully",
    data: {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      profileImage: admin.profileImage,
      primaryPhoneNumber: admin.primaryPhoneNumber,
      secondaryPhoneNumber: admin.secondaryPhoneNumber,
      token: token,
    },
  });
}
