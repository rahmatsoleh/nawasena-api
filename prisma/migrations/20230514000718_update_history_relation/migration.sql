/*
  Warnings:

  - You are about to drop the `_HistoryServiceToProviderService` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `providerServiceId` to the `HistoryService` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_HistoryServiceToProviderService" DROP CONSTRAINT "_HistoryServiceToProviderService_A_fkey";

-- DropForeignKey
ALTER TABLE "_HistoryServiceToProviderService" DROP CONSTRAINT "_HistoryServiceToProviderService_B_fkey";

-- AlterTable
ALTER TABLE "HistoryService" ADD COLUMN     "providerServiceId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_HistoryServiceToProviderService";

-- AddForeignKey
ALTER TABLE "HistoryService" ADD CONSTRAINT "HistoryService_providerServiceId_fkey" FOREIGN KEY ("providerServiceId") REFERENCES "ProviderService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
