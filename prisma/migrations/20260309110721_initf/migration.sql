/*
  Warnings:

  - You are about to drop the `Site` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `image` to the `MenuItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LegalEnum" AS ENUM ('privacy_policy', 'terms_and_conditions');

-- AlterTable
ALTER TABLE "MenuItem" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "admin" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "primaryPhoneNumber" TEXT,
ADD COLUMN     "profileImage" TEXT,
ADD COLUMN     "secondaryPhoneNumber" TEXT;

-- AlterTable
ALTER TABLE "menu_category" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Site";

-- CreateTable
CREATE TABLE "site" (
    "id" TEXT NOT NULL,
    "siteLogo" TEXT NOT NULL,
    "siteName" TEXT NOT NULL,
    "siteURL" TEXT NOT NULL,
    "description" TEXT,
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "site_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeatureCategory" (
    "id" TEXT NOT NULL,

    CONSTRAINT "FeatureCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Legal" (
    "id" TEXT NOT NULL,
    "type" "LegalEnum" NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Legal_pkey" PRIMARY KEY ("id")
);
