/*
  Warnings:

  - You are about to drop the column `pymentMethord` on the `payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "payment" DROP COLUMN "pymentMethord",
ADD COLUMN     "paymentMethod" "PaymentMethods";
