/*
  Warnings:

  - The primary key for the `cart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `cart` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "cart_userId_key";

-- AlterTable
ALTER TABLE "cart" DROP CONSTRAINT "cart_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "cart_pkey" PRIMARY KEY ("id");
