-- CreateTable
CREATE TABLE `UserTORecruitLike` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `recruitId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserTORecruitLike` ADD CONSTRAINT `UserTORecruitLike_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTORecruitLike` ADD CONSTRAINT `UserTORecruitLike_recruitId_fkey` FOREIGN KEY (`recruitId`) REFERENCES `UserRecruit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
