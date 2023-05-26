/*
  Warnings:

  - You are about to drop the column `DescriptionOfBusiness` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Employee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Corporation` MODIFY `DescriptionOfBusiness` VARCHAR(2000) NULL,
    MODIFY `phoneNumber` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Employee` DROP COLUMN `DescriptionOfBusiness`,
    DROP COLUMN `location`,
    ADD COLUMN `introduction` VARCHAR(2000) NULL,
    MODIFY `phoneNumber` VARCHAR(191) NULL;
