-- AlterTable
ALTER TABLE "payment" ALTER COLUMN "pymentMethord" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'pending';
