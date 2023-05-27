/*
  Warnings:

  - You are about to drop the column `firebaseUID` on the `Corporation` table. All the data in the column will be lost.
  - Added the required column `sharedPassword` to the `Corporation` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Corporation_firebaseUID_key` ON `Corporation`;

-- AlterTable
ALTER TABLE `Corporation` DROP COLUMN `firebaseUID`,
    ADD COLUMN `sharedPassword` VARCHAR(191) NOT NULL;
