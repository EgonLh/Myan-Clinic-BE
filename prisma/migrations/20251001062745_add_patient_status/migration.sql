/*
  Warnings:

  - You are about to drop the column `status` on the `Patient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Patient" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'inactive';
