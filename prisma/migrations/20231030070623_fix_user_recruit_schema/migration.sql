/*
  Warnings:

  - You are about to drop the column `developmentPeriod` on the `UserRecruit` table. All the data in the column will be lost.
  - You are about to drop the column `hackthonName` on the `UserRecruit` table. All the data in the column will be lost.
  - You are about to alter the column `numberOfApplicants` on the `UserRecruit` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `developmentEndDate` to the `UserRecruit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `developmentStartDate` to the `UserRecruit` table without a default value. This is not possible if the table is not empty.
  - Made the column `details` on table `UserRecruit` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `UserRecruit` DROP COLUMN `developmentPeriod`,
    DROP COLUMN `hackthonName`,
    ADD COLUMN `developmentEndDate` VARCHAR(191) NOT NULL,
    ADD COLUMN `developmentStartDate` VARCHAR(191) NOT NULL,
    ADD COLUMN `hackathonName` VARCHAR(191) NULL,
    MODIFY `details` VARCHAR(500) NOT NULL,
    MODIFY `numberOfApplicants` INTEGER NOT NULL;
