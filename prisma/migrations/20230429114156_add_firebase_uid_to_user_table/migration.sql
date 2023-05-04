/*
  Warnings:

  - A unique constraint covering the columns `[firebaseUID]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `firebaseUID` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_firebaseUID_key` ON `User`(`firebaseUID`);
