-- DropIndex
DROP INDEX "admin_username_key";

-- AlterTable
ALTER TABLE "site" ALTER COLUMN "siteURL" DROP NOT NULL;
