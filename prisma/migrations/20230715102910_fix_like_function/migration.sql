/*
  Warnings:

  - You are about to drop the column `DescriptionOfBusiness` on the `Corporation` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Corporation` DROP COLUMN `DescriptionOfBusiness`,
    ADD COLUMN `descriptionOfBusiness` TEXT NULL;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `likes`;

-- CreateTable
CREATE TABLE `PeriodLikeSum` (
    `id` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `likesCount` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PeriodLikeSum` ADD CONSTRAINT `PeriodLikeSum_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
