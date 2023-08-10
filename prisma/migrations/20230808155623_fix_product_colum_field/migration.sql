/*
  Warnings:

  - You are about to drop the column `detail` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `headline` on the `Product` table. All the data in the column will be lost.
  - Added the required column `developmentBackground` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overview` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reasonForSkillSelection` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skills` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `detail`,
    DROP COLUMN `headline`,
    ADD COLUMN `developmentBackground` VARCHAR(1000) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `overview` VARCHAR(2000) NOT NULL,
    ADD COLUMN `reasonForSkillSelection` VARCHAR(1000) NOT NULL,
    ADD COLUMN `skills` JSON NOT NULL;
