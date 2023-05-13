/*
  Warnings:

  - You are about to drop the column `recruitId` on the `UserRecruit` table. All the data in the column will be lost.
  - You are about to drop the `Applicant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Recruit` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `headline` to the `UserRecruit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberOfApplicants` to the `UserRecruit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `programingSkills` to the `UserRecruit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Applicant` DROP FOREIGN KEY `Applicant_recruitId_fkey`;

-- DropForeignKey
ALTER TABLE `Applicant` DROP FOREIGN KEY `Applicant_userId_fkey`;

-- DropForeignKey
ALTER TABLE `UserRecruit` DROP FOREIGN KEY `UserRecruit_recruitId_fkey`;

-- DropIndex
DROP INDEX `UserRecruit_recruitId_recruiterId_key` ON `UserRecruit`;

-- AlterTable
ALTER TABLE `UserRecruit` DROP COLUMN `recruitId`,
    ADD COLUMN `details` VARCHAR(500) NULL,
    ADD COLUMN `developmentPeriod` VARCHAR(191) NULL,
    ADD COLUMN `hackathonUrl` VARCHAR(191) NULL,
    ADD COLUMN `hackthonName` VARCHAR(191) NULL,
    ADD COLUMN `headline` VARCHAR(191) NOT NULL,
    ADD COLUMN `numberOfApplicants` VARCHAR(191) NOT NULL,
    ADD COLUMN `programingSkills` JSON NOT NULL;

-- DropTable
DROP TABLE `Applicant`;

-- DropTable
DROP TABLE `Recruit`;

-- CreateTable
CREATE TABLE `UserRecruitApplicant` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `userRecruitId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `UserRecruitApplicant_userId_userRecruitId_key`(`userId`, `userRecruitId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserRecruitApplicant` ADD CONSTRAINT `UserRecruitApplicant_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRecruitApplicant` ADD CONSTRAINT `UserRecruitApplicant_userRecruitId_fkey` FOREIGN KEY (`userRecruitId`) REFERENCES `UserRecruit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
