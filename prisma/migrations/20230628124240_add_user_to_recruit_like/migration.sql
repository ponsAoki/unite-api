/*
  Warnings:

  - You are about to drop the `UserTORecruitLike` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `UserTORecruitLike` DROP FOREIGN KEY `UserTORecruitLike_recruitId_fkey`;

-- DropForeignKey
ALTER TABLE `UserTORecruitLike` DROP FOREIGN KEY `UserTORecruitLike_userId_fkey`;

-- DropTable
DROP TABLE `UserTORecruitLike`;

-- CreateTable
CREATE TABLE `UserToRecruitLike` (
    `id` VARCHAR(191) NOT NULL,
    `recruitId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserToRecruitLike` ADD CONSTRAINT `UserToRecruitLike_recruitId_fkey` FOREIGN KEY (`recruitId`) REFERENCES `UserRecruit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
