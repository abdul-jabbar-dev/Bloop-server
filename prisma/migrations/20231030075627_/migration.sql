/*
  Warnings:

  - A unique constraint covering the columns `[cartId]` on the table `order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cartId` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" ADD COLUMN     "cartId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "order_cartId_key" ON "order"("cartId");
