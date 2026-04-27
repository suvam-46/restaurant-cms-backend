import { Prisma } from "@prisma/client";
import express from "express";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export async function adminUpdate(
  req: express.Request,
  res: express.Response
) {
  try {
    const idParam = req.params.id as string;
    if (!idParam) return res.status(400).json({ message: "Admin ID is required" });

    const adminId = parseInt(idParam, 10);
    if (isNaN(adminId)) return res.status(400).json({ message: "Invalid Admin ID format" });

    const {
      username,
      email,
      password,
      primaryPhoneNumber,
      secondaryPhoneNumber,
      isActive,
      profileImage
    } = req.body;

    // 1. Verify existence
    const currentAdmin = await prisma.admin.findUnique({ where: { id: adminId } });
    if (!currentAdmin) return res.status(404).json({ message: "Admin not found." });

    // 2. PRE-CHECK: Check if the new email or username is taken by ANOTHER admin
    // This prevents the UniqueConstraintViolation before Prisma even tries the update
    if (email || username) {
      const conflict = await prisma.admin.findFirst({
        where: {
          OR: [
            email ? { email } : {},
            username ? { username } : {}
          ],
          NOT: { id: adminId } // "Find someone with this email who IS NOT me"
        }
      });

      if (conflict) {
        const field = conflict.email === email ? "Email" : "Username";
        return res.status(400).json({ message: `${field} is already taken by another admin.` });
      }
    }

    // 3. Build the update object
    const updateData: Prisma.AdminUpdateInput = {};

    // Only add to updateData if the value is provided AND different from current
    if (username && username !== currentAdmin.username) updateData.username = username;
    if (email && email !== currentAdmin.email) updateData.email = email;
    if (primaryPhoneNumber) updateData.primaryPhoneNumber = primaryPhoneNumber;
    if (secondaryPhoneNumber) updateData.secondaryPhoneNumber = secondaryPhoneNumber;
    if (profileImage) updateData.profileImage = profileImage;
    
    if (typeof isActive === "boolean") updateData.isActive = isActive;

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // 4. Perform Update
    const updatedAdmin = await prisma.admin.update({
      where: { id: adminId },
      data: updateData,
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
    console.error("Update Error:", error);

    // Specific Prisma Unique Constraint Error Handling (P2002)
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return res.status(400).json({
        message: "Unique constraint failed: The username or email is already in use.",
        target: error.meta?.target 
      });
    }

    return res.status(500).json({
      message: "Something went wrong",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}