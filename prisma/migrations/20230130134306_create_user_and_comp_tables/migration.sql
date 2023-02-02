-- CreateEnum
CREATE TYPE "CompModalities" AS ENUM ('DANCE', 'RIME');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone_number" TEXT,
    "description" TEXT,
    "social_networks" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comps" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT,
    "date_time" TIMESTAMP(3) NOT NULL,
    "max_number_participants" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "online" BOOLEAN NOT NULL DEFAULT false,
    "rules" TEXT,
    "award" TEXT,
    "manual_start" BOOLEAN NOT NULL DEFAULT true,
    "manual_shutdown" BOOLEAN NOT NULL DEFAULT true,
    "modality" "CompModalities" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_admin_id" TEXT NOT NULL,
    "user_winner_id" TEXT,

    CONSTRAINT "comps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_phone_number_key" ON "users"("email", "phone_number");

-- AddForeignKey
ALTER TABLE "comps" ADD CONSTRAINT "comps_user_admin_id_fkey" FOREIGN KEY ("user_admin_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comps" ADD CONSTRAINT "comps_user_winner_id_fkey" FOREIGN KEY ("user_winner_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
