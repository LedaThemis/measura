/*
  Warnings:

  - You are about to alter the column `value` on the `Measurement` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,4)` to `DoublePrecision`.
  - You are about to alter the column `weight` on the `UserGoal` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,4)` to `DoublePrecision`.
  - You are about to alter the column `height` on the `UserGoal` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,4)` to `DoublePrecision`.
  - You are about to alter the column `neck` on the `UserGoal` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,4)` to `DoublePrecision`.
  - You are about to alter the column `shoulders` on the `UserGoal` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,4)` to `DoublePrecision`.
  - You are about to alter the column `arms` on the `UserGoal` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,4)` to `DoublePrecision`.
  - You are about to alter the column `chest` on the `UserGoal` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,4)` to `DoublePrecision`.
  - You are about to alter the column `forearms` on the `UserGoal` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,4)` to `DoublePrecision`.
  - You are about to alter the column `wrist` on the `UserGoal` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,4)` to `DoublePrecision`.
  - You are about to alter the column `waist` on the `UserGoal` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,4)` to `DoublePrecision`.
  - You are about to alter the column `hips` on the `UserGoal` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,4)` to `DoublePrecision`.
  - You are about to alter the column `thighs` on the `UserGoal` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,4)` to `DoublePrecision`.
  - You are about to alter the column `calves` on the `UserGoal` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,4)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Measurement" ALTER COLUMN "value" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "UserGoal" ALTER COLUMN "weight" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "height" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "neck" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "shoulders" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "arms" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "chest" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "forearms" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "wrist" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "waist" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "hips" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "thighs" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "calves" SET DATA TYPE DOUBLE PRECISION;
