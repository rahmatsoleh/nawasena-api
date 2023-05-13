/*
  Warnings:

  - A unique constraint covering the columns `[providerServiceId]` on the table `CategoryProduct` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `providerServiceId` to the `CategoryProduct` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ServiceStatus" AS ENUM ('active', 'nonactive', 'busy');

-- AlterTable
ALTER TABLE "CategoryProduct" ADD COLUMN     "providerServiceId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ProviderService" (
    "id" TEXT NOT NULL,
    "namaUsaha" TEXT NOT NULL,
    "koordinat" TEXT,
    "service" TEXT NOT NULL,
    "priceMin" INTEGER NOT NULL,
    "priceMax" INTEGER NOT NULL,
    "status" "ServiceStatus" NOT NULL DEFAULT 'nonactive',
    "userId" TEXT NOT NULL,
    "categoryProductId" TEXT,

    CONSTRAINT "ProviderService_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProviderService_userId_key" ON "ProviderService"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryProduct_providerServiceId_key" ON "CategoryProduct"("providerServiceId");

-- AddForeignKey
ALTER TABLE "ProviderService" ADD CONSTRAINT "ProviderService_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryProduct" ADD CONSTRAINT "CategoryProduct_providerServiceId_fkey" FOREIGN KEY ("providerServiceId") REFERENCES "ProviderService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
