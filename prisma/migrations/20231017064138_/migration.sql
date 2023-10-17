/*
  Warnings:

  - You are about to drop the column `assest_id` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `formet` on the `media` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "media" DROP COLUMN "assest_id",
DROP COLUMN "formet",
ADD COLUMN     "asset_id" TEXT,
ADD COLUMN     "format" TEXT;
