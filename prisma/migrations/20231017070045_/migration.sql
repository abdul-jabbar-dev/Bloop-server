/*
  Warnings:

  - You are about to drop the column `api_key` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `asset_id` on the `media` table. All the data in the column will be lost.
  - Made the column `public_id` on table `media` required. This step will fail if there are existing NULL values in that column.
  - Made the column `url` on table `media` required. This step will fail if there are existing NULL values in that column.
  - Made the column `original_filename` on table `media` required. This step will fail if there are existing NULL values in that column.
  - Made the column `format` on table `media` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "media" DROP COLUMN "api_key",
DROP COLUMN "asset_id",
ALTER COLUMN "public_id" SET NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TEXT,
ALTER COLUMN "url" SET NOT NULL,
ALTER COLUMN "original_filename" SET NOT NULL,
ALTER COLUMN "format" SET NOT NULL;
