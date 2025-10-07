-- AlterTable
ALTER TABLE "public"."Doctor" ADD COLUMN     "currentLoad" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
