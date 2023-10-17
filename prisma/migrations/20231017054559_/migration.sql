-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_profileImage_fkey";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "profileImage" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_profileImage_fkey" FOREIGN KEY ("profileImage") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
