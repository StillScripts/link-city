/*
  Warnings:

  - Added the required column `type` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Link_title_key";

-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "title" DROP NOT NULL;
