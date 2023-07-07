-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_productId_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_recruitId_fkey`;

-- DropForeignKey
ALTER TABLE `UserRecruitApplication` DROP FOREIGN KEY `UserRecruitApplication_recruitId_fkey`;

-- DropForeignKey
ALTER TABLE `UserRecruitParticipant` DROP FOREIGN KEY `UserRecruitParticipant_userRecruitId_fkey`;

-- DropForeignKey
ALTER TABLE `UserToRecruitLike` DROP FOREIGN KEY `UserToRecruitLike_recruitId_fkey`;

-- AddForeignKey
ALTER TABLE `UserRecruitApplication` ADD CONSTRAINT `UserRecruitApplication_recruitId_fkey` FOREIGN KEY (`recruitId`) REFERENCES `UserRecruit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRecruitParticipant` ADD CONSTRAINT `UserRecruitParticipant_userRecruitId_fkey` FOREIGN KEY (`userRecruitId`) REFERENCES `UserRecruit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_recruitId_fkey` FOREIGN KEY (`recruitId`) REFERENCES `UserRecruit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserToRecruitLike` ADD CONSTRAINT `UserToRecruitLike_recruitId_fkey` FOREIGN KEY (`recruitId`) REFERENCES `UserRecruit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
