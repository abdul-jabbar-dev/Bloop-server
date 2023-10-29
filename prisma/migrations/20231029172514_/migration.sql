/*
  Warnings:

  - You are about to drop the column `order` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `servicePlacedId` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `problemDetails` on the `servicePlaced` table. All the data in the column will be lost.
  - You are about to drop the column `problemItem` on the `servicePlaced` table. All the data in the column will be lost.
  - Added the required column `status` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `issueDetails` to the `servicePlaced` table without a default value. This is not possible if the table is not empty.
  - Added the required column `issueItemName` to the `servicePlaced` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('paid', 'pending');

-- DropForeignKey
ALTER TABLE "servicePlaced" DROP CONSTRAINT "servicePlaced_paymentId_fkey";

-- DropIndex
DROP INDEX "payment_servicePlacedId_key";

-- AlterTable
ALTER TABLE "order" DROP COLUMN "order",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE "payment" DROP COLUMN "servicePlacedId",
ADD COLUMN     "status" "PaymentStatus" NOT NULL;

-- AlterTable
ALTER TABLE "servicePlaced" DROP COLUMN "problemDetails",
DROP COLUMN "problemItem",
ADD COLUMN     "issueDetails" TEXT NOT NULL,
ADD COLUMN     "issueItemName" TEXT NOT NULL,
ALTER COLUMN "paymentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "servicePlaced" ADD CONSTRAINT "servicePlaced_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
