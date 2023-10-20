/*
  Warnings:

  - You are about to drop the column `serviceProviderIds` on the `serviceType` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "serviceType_serviceProviderIds_key";

-- AlterTable
ALTER TABLE "serviceType" DROP COLUMN "serviceProviderIds";
