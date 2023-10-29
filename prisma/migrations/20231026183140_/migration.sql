/*
  Warnings:

  - You are about to drop the column `shippingNumber` on the `shippingAddress` table. All the data in the column will be lost.
  - Added the required column `isDefault` to the `shippingAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "shippingAddress" DROP COLUMN "shippingNumber",
ADD COLUMN     "isDefault" BOOLEAN NOT NULL;
