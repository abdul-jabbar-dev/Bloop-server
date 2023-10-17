/*
  Warnings:

  - You are about to drop the column `serviceProviderId` on the `service` table. All the data in the column will be lost.
  - Added the required column `serviceId` to the `serviceProvider` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "service" DROP CONSTRAINT "service_serviceProviderId_fkey";

-- AlterTable
ALTER TABLE "service" DROP COLUMN "serviceProviderId";

-- AlterTable
ALTER TABLE "serviceProvider" ADD COLUMN     "serviceId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "serviceProvider" ADD CONSTRAINT "serviceProvider_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
