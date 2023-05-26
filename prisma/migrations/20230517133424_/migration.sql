-- CreateTable
CREATE TABLE `Corporation` (
    `id` VARCHAR(191) NOT NULL,
    `firebaseUID` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NULL,
    `DescriptionOfBusiness` VARCHAR(2000) NOT NULL,
    `location` VARCHAR(191) NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Corporation_firebaseUID_key`(`firebaseUID`),
    UNIQUE INDEX `Corporation_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employee` (
    `id` VARCHAR(191) NOT NULL,
    `firebaseUID` VARCHAR(191) NULL,
    `corporationId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NULL,
    `DescriptionOfBusiness` VARCHAR(2000) NOT NULL,
    `location` VARCHAR(191) NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Employee_firebaseUID_key`(`firebaseUID`),
    UNIQUE INDEX `Employee_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_corporationId_fkey` FOREIGN KEY (`corporationId`) REFERENCES `Corporation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
