/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `serviceProvider` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `serviceProvider` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "serviceProvider" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "serviceProvider_userId_key" ON "serviceProvider"("userId");

-- AddForeignKey
ALTER TABLE "serviceProvider" ADD CONSTRAINT "serviceProvider_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
