/*
  Warnings:

  - A unique constraint covering the columns `[providerId]` on the table `serviceProvider` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `providerId` to the `serviceProvider` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "serviceProvider" ADD COLUMN     "providerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "serviceProvider_providerId_key" ON "serviceProvider"("providerId");
