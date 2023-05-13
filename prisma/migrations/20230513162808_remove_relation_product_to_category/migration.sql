/*
  Warnings:

  - You are about to drop the column `providerServiceId` on the `CategoryProduct` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CategoryProduct" DROP CONSTRAINT "CategoryProduct_providerServiceId_fkey";

-- DropIndex
DROP INDEX "CategoryProduct_providerServiceId_key";

-- AlterTable
ALTER TABLE "CategoryProduct" DROP COLUMN "providerServiceId";

-- AddForeignKey
ALTER TABLE "ProviderService" ADD CONSTRAINT "ProviderService_categoryProductId_fkey" FOREIGN KEY ("categoryProductId") REFERENCES "CategoryProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
