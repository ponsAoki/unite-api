/*
  Warnings:

  - A unique constraint covering the columns `[sharedPassword]` on the table `Corporation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Corporation_sharedPassword_key` ON `Corporation`(`sharedPassword`);
