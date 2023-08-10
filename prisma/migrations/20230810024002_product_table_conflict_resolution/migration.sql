/*
  Warnings:

  - You are about to alter the column `imageUrl` on the `Employee` table. The data in that column could be lost. The data in that column will be cast from `VarChar(2083)` to `VarChar(2000)`.

*/
-- AlterTable
ALTER TABLE `Employee` MODIFY `imageUrl` VARCHAR(2000) NULL;
