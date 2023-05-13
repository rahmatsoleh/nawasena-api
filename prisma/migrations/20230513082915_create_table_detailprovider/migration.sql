-- CreateTable
CREATE TABLE "ProviderDetail" (
    "id" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "joinRequestFileUrl" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ProviderDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProviderDetail_userId_key" ON "ProviderDetail"("userId");

-- AddForeignKey
ALTER TABLE "ProviderDetail" ADD CONSTRAINT "ProviderDetail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
