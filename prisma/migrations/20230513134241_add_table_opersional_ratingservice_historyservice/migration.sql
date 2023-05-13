/*
  Warnings:

  - Made the column `categoryProductId` on table `ProviderService` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ProviderService" ALTER COLUMN "categoryProductId" SET NOT NULL;

-- CreateTable
CREATE TABLE "Operasionals" (
    "id" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "startAt" TEXT NOT NULL,
    "EndAt" TEXT NOT NULL,
    "providerServiceId" TEXT NOT NULL,

    CONSTRAINT "Operasionals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RatingService" (
    "id" TEXT NOT NULL,
    "rating" DOUBLE PRECISION,
    "comment" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "RatingService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoryService" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payment" INTEGER NOT NULL,

    CONSTRAINT "HistoryService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProviderServiceToRatingService" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_HistoryServiceToProviderService" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProviderServiceToRatingService_AB_unique" ON "_ProviderServiceToRatingService"("A", "B");

-- CreateIndex
CREATE INDEX "_ProviderServiceToRatingService_B_index" ON "_ProviderServiceToRatingService"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_HistoryServiceToProviderService_AB_unique" ON "_HistoryServiceToProviderService"("A", "B");

-- CreateIndex
CREATE INDEX "_HistoryServiceToProviderService_B_index" ON "_HistoryServiceToProviderService"("B");

-- AddForeignKey
ALTER TABLE "Operasionals" ADD CONSTRAINT "Operasionals_providerServiceId_fkey" FOREIGN KEY ("providerServiceId") REFERENCES "ProviderService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingService" ADD CONSTRAINT "RatingService_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryService" ADD CONSTRAINT "HistoryService_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProviderServiceToRatingService" ADD CONSTRAINT "_ProviderServiceToRatingService_A_fkey" FOREIGN KEY ("A") REFERENCES "ProviderService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProviderServiceToRatingService" ADD CONSTRAINT "_ProviderServiceToRatingService_B_fkey" FOREIGN KEY ("B") REFERENCES "RatingService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HistoryServiceToProviderService" ADD CONSTRAINT "_HistoryServiceToProviderService_A_fkey" FOREIGN KEY ("A") REFERENCES "HistoryService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HistoryServiceToProviderService" ADD CONSTRAINT "_HistoryServiceToProviderService_B_fkey" FOREIGN KEY ("B") REFERENCES "ProviderService"("id") ON DELETE CASCADE ON UPDATE CASCADE;
