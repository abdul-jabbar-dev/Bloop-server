/*
  Warnings:

  - You are about to drop the column `serviceId` on the `serviceProvider` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "serviceProvider" DROP CONSTRAINT "serviceProvider_serviceId_fkey";

-- AlterTable
ALTER TABLE "serviceProvider" DROP COLUMN "serviceId";
