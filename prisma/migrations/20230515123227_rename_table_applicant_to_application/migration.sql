/*
  Warnings:

  - You are about to drop the `UserRecruitApplicant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `UserRecruitApplicant` DROP FOREIGN KEY `UserRecruitApplicant_userId_fkey`;

-- DropForeignKey
ALTER TABLE `UserRecruitApplicant` DROP FOREIGN KEY `UserRecruitApplicant_userRecruitId_fkey`;

-- DropTable
DROP TABLE `UserRecruitApplicant`;

-- CreateTable
CREATE TABLE `UserRecruitApplication` (
    `id` VARCHAR(191) NOT NULL,
    `applicantId` VARCHAR(191) NOT NULL,
    `recruitId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `UserRecruitApplication_applicantId_recruitId_key`(`applicantId`, `recruitId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserRecruitApplication` ADD CONSTRAINT `UserRecruitApplication_applicantId_fkey` FOREIGN KEY (`applicantId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRecruitApplication` ADD CONSTRAINT `UserRecruitApplication_recruitId_fkey` FOREIGN KEY (`recruitId`) REFERENCES `UserRecruit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
