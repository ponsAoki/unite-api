-- AlterTable
ALTER TABLE `Recruit` ADD COLUMN `hackthonName` VARCHAR(191) NULL,
    MODIFY `details` VARCHAR(500) NULL,
    MODIFY `numberOfApplicants` VARCHAR(191) NOT NULL;
