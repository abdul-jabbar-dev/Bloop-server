/*
  Warnings:

  - You are about to drop the column `bookedDate` on the `servicePlaced` table. All the data in the column will be lost.
  - Added the required column `bookingDate` to the `servicePlaced` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "servicePlaced" DROP COLUMN "bookedDate",
ADD COLUMN     "bookingDate" TEXT NOT NULL;
