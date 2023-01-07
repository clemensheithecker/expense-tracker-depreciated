-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "latestTransactionAt" TIMESTAMP(3),
ADD COLUMN     "totalTransactions" INTEGER NOT NULL DEFAULT 0;
