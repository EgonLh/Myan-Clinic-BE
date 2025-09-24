/*
  Warnings:

  - You are about to drop the column `address` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `bio` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `licenseNo` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `phones` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `specialty` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `storageId` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `medicalHistory` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `phones` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `storageId` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Patient` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uid]` on the table `Doctor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uid]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `departmentId` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `license` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ph` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uid` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addr` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ph` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uid` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_userId_fkey";

-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_userId_fkey";

-- DropIndex
DROP INDEX "Doctor_userId_key";

-- DropIndex
DROP INDEX "Patient_userId_key";

-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "address",
DROP COLUMN "bio",
DROP COLUMN "licenseNo",
DROP COLUMN "phones",
DROP COLUMN "specialty",
DROP COLUMN "storageId",
DROP COLUMN "userId",
ADD COLUMN     "departmentId" INTEGER NOT NULL,
ADD COLUMN     "license" TEXT NOT NULL,
ADD COLUMN     "ph" TEXT NOT NULL,
ADD COLUMN     "uid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "address",
DROP COLUMN "dateOfBirth",
DROP COLUMN "gender",
DROP COLUMN "medicalHistory",
DROP COLUMN "phones",
DROP COLUMN "storageId",
DROP COLUMN "userId",
ADD COLUMN     "addr" TEXT NOT NULL,
ADD COLUMN     "ph" TEXT NOT NULL,
ADD COLUMN     "uid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Root" (
    "id" SERIAL NOT NULL,
    "uid" INTEGER NOT NULL,

    CONSTRAINT "Root_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "notes" TEXT,
    "invoice" TEXT,
    "costs" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Storage" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,

    CONSTRAINT "Storage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "storageId" INTEGER NOT NULL,
    "filename" TEXT NOT NULL,
    "log" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "remark" TEXT,
    "description" TEXT,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Root_uid_key" ON "Root"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Storage_patientId_key" ON "Storage"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_uid_key" ON "Doctor"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_uid_key" ON "Patient"("uid");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Root" ADD CONSTRAINT "Root_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Storage" ADD CONSTRAINT "Storage_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_storageId_fkey" FOREIGN KEY ("storageId") REFERENCES "Storage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
