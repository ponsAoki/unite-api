-- AlterTable
ALTER TABLE `ChatRoomParticipant` ADD COLUMN `employeeId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Scout` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `employeeId` VARCHAR(191) NOT NULL,
    `corporationId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ChatRoomParticipant` ADD CONSTRAINT `ChatRoomParticipant_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Scout` ADD CONSTRAINT `Scout_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Scout` ADD CONSTRAINT `Scout_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Scout` ADD CONSTRAINT `Scout_corporationId_fkey` FOREIGN KEY (`corporationId`) REFERENCES `Corporation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
