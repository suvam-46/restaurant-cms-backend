import prisma from "@/lib/prisma";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { EnvConfig } from "@/configs/env.config";

export async function adminRegister(
  req: express.Request,
  res: express.Response
) {
  try {
    const { 
      username, 
      email, 
      password, 
      primaryPhoneNumber, 
      secondaryPhoneNumber 
    } = req.body;

    // 1️⃣ Validation
    if (!username || !email || !password || !primaryPhoneNumber || !secondaryPhoneNumber) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    // 2️⃣ Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: {
        email 
      },
    });
    if (existingAdmin) {
      return res.status(409).json({
        message: "Admin already exists with this email or username.",
      });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create admin (Passing phone numbers as Strings)
    const admin = await prisma.admin.create({
      data: {
        username,
        email,
        password: hashedPassword,
        primaryPhoneNumber: String(primaryPhoneNumber), // 👈 Force to String
        secondaryPhoneNumber: String(secondaryPhoneNumber), // 👈 Force to String
      },
    });

    // 5️⃣ Generate token
    const token = jwt.sign(
      {
        adminId: admin.id,
        username: admin.username,
        email: admin.email,
      },
      EnvConfig.JWT_SECRET
    );

    return res.status(201).json({
      message: "Admin registered successfully.",
      data: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        token,
      },
    });

  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
}