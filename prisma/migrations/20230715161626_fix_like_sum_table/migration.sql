/*
  Warnings:

  - You are about to alter the column `likesCount` on the `PeriodLikeSum` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `PeriodLikeSum` MODIFY `likesCount` INTEGER NOT NULL,
    MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
