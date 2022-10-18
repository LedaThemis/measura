-- CreateTable
CREATE TABLE "UserGoal" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "weight" DECIMAL(65,4) NOT NULL,
    "height" DECIMAL(65,4) NOT NULL,
    "neck" DECIMAL(65,4) NOT NULL,
    "shoulders" DECIMAL(65,4) NOT NULL,
    "arms" DECIMAL(65,4) NOT NULL,
    "chest" DECIMAL(65,4) NOT NULL,
    "forearms" DECIMAL(65,4) NOT NULL,
    "wrist" DECIMAL(65,4) NOT NULL,
    "waist" DECIMAL(65,4) NOT NULL,
    "hips" DECIMAL(65,4) NOT NULL,
    "thighs" DECIMAL(65,4) NOT NULL,
    "calves" DECIMAL(65,4) NOT NULL,

    CONSTRAINT "UserGoal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserGoal_userId_key" ON "UserGoal"("userId");

-- AddForeignKey
ALTER TABLE "UserGoal" ADD CONSTRAINT "UserGoal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
