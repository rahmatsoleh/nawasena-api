-- CreateEnum
CREATE TYPE "StatusTransaction" AS ENUM ('ditolak', 'selesai');

-- AlterTable
ALTER TABLE "HistoryService" ADD COLUMN     "statusTransaction" "StatusTransaction" NOT NULL DEFAULT 'selesai';
