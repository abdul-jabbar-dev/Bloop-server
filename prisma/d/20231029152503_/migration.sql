/*
  Warnings:

  - A unique constraint covering the columns `[paymentId]` on the table `servicePlaced` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `paymentId` to the `servicePlaced` table without a default value. This is not possible if the table is not empty.
  - Added the required column `problemDetails` to the `servicePlaced` table without a default value. This is not possible if the table is not empty.
  - Added the required column `problemItem` to the `servicePlaced` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentMethods" AS ENUM ('Bkash', 'Rocket', 'Nogod', 'CashOnDelivery', 'Card');

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "order" "Status" NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE "servicePlaced" ADD COLUMN     "paymentId" TEXT NOT NULL,
ADD COLUMN     "problemDetails" TEXT NOT NULL,
ADD COLUMN     "problemItem" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "payment" (
    "id" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "paymentVarificationCode" TEXT,
    "servicePlacedId" TEXT NOT NULL,
    "pymentMethord" "PaymentMethods" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payment_servicePlacedId_key" ON "payment"("servicePlacedId");

-- CreateIndex
CREATE UNIQUE INDEX "servicePlaced_paymentId_key" ON "servicePlaced"("paymentId");

-- AddForeignKey
ALTER TABLE "servicePlaced" ADD CONSTRAINT "servicePlaced_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
