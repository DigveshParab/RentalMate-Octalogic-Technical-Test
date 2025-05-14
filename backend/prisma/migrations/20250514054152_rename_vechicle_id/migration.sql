/*
  Warnings:

  - You are about to drop the column `vechicleId` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `vehicleId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_vechicleId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "vechicleId",
ADD COLUMN     "vehicleId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
