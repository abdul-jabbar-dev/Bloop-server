/*
  Warnings:

  - You are about to drop the column `town` on the `shippingAddress` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "shippingAddress" DROP COLUMN "town",
ADD COLUMN     "area" TEXT NOT NULL DEFAULT 'Hossan market';
