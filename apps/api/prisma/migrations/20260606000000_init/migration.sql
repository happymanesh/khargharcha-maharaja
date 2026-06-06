-- CreateEnum
CREATE TYPE "MembershipTier" AS ENUM ('GENERAL', 'SILVER', 'GOLD', 'PLATINUM', 'LIFETIME');

-- CreateEnum
CREATE TYPE "DonationCategory" AS ENUM ('GANESH_UTSAV', 'ANNADAN', 'MEDICAL', 'EDUCATION', 'DISASTER_RELIEF', 'GENERAL');

-- CreateEnum
CREATE TYPE "DonationStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('GANESH_UTSAV', 'DAHI_HANDI', 'BLOOD_DONATION', 'MEDICAL_CAMP', 'CULTURAL', 'EDUCATIONAL', 'SOCIAL_WELFARE');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "VolunteerStatus" AS ENUM ('PENDING', 'ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('SUPER_ADMIN', 'ORG_ADMIN', 'COMMITTEE');

-- CreateEnum
CREATE TYPE "BloodGroup" AS ENUM ('A_POS', 'A_NEG', 'B_POS', 'B_NEG', 'AB_POS', 'AB_NEG', 'O_POS', 'O_NEG', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('PHOTO', 'VIDEO');

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "email" TEXT,
    "area" TEXT NOT NULL,
    "bloodGroup" "BloodGroup" NOT NULL DEFAULT 'UNKNOWN',
    "language" TEXT NOT NULL DEFAULT 'mr',
    "membershipTier" "MembershipTier" NOT NULL DEFAULT 'GENERAL',
    "membershipNumber" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "otpCode" TEXT,
    "otpExpiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "AdminRole" NOT NULL DEFAULT 'COMMITTEE',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleMr" TEXT NOT NULL,
    "titleHi" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "EventType" NOT NULL,
    "status" "EventStatus" NOT NULL DEFAULT 'UPCOMING',
    "date" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "time" TEXT NOT NULL,
    "venue" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL DEFAULT 1000,
    "imageUrl" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventRegistration" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "qrCode" TEXT NOT NULL,
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attendedAt" TIMESTAMP(3),

    CONSTRAINT "EventRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donation" (
    "id" TEXT NOT NULL,
    "memberId" TEXT,
    "donorName" TEXT NOT NULL,
    "donorMobile" TEXT NOT NULL,
    "donorEmail" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "category" "DonationCategory" NOT NULL DEFAULT 'GENERAL',
    "status" "DonationStatus" NOT NULL DEFAULT 'PENDING',
    "razorpayOrderId" TEXT,
    "razorpayPaymentId" TEXT,
    "receiptNumber" TEXT NOT NULL,
    "receiptUrl" TEXT,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Volunteer" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "skills" TEXT[],
    "status" "VolunteerStatus" NOT NULL DEFAULT 'PENDING',
    "hoursContributed" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Volunteer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsItem" (
    "id" TEXT NOT NULL,
    "titleMr" TEXT NOT NULL,
    "titleHi" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "contentMr" TEXT NOT NULL,
    "contentHi" TEXT NOT NULL,
    "contentEn" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'Announcement',
    "imageUrl" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NewsItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GalleryAlbum" (
    "id" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleMr" TEXT NOT NULL,
    "coverUrl" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GalleryAlbum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GalleryItem" (
    "id" TEXT NOT NULL,
    "albumId" TEXT,
    "title" TEXT NOT NULL,
    "type" "MediaType" NOT NULL DEFAULT 'PHOTO',
    "url" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GalleryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSetting" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_mobile_key" ON "Member"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "Member_email_key" ON "Member"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Member_membershipNumber_key" ON "Member"("membershipNumber");

-- CreateIndex
CREATE INDEX "Member_mobile_idx" ON "Member"("mobile");

-- CreateIndex
CREATE INDEX "Member_membershipTier_idx" ON "Member"("membershipTier");

-- CreateIndex
CREATE INDEX "Member_area_idx" ON "Member"("area");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE INDEX "AdminUser_email_idx" ON "AdminUser"("email");

-- CreateIndex
CREATE INDEX "Event_status_idx" ON "Event"("status");

-- CreateIndex
CREATE INDEX "Event_date_idx" ON "Event"("date");

-- CreateIndex
CREATE INDEX "Event_type_idx" ON "Event"("type");

-- CreateIndex
CREATE UNIQUE INDEX "EventRegistration_qrCode_key" ON "EventRegistration"("qrCode");

-- CreateIndex
CREATE INDEX "EventRegistration_eventId_idx" ON "EventRegistration"("eventId");

-- CreateIndex
CREATE INDEX "EventRegistration_memberId_idx" ON "EventRegistration"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "EventRegistration_eventId_memberId_key" ON "EventRegistration"("eventId", "memberId");

-- CreateIndex
CREATE UNIQUE INDEX "Donation_razorpayOrderId_key" ON "Donation"("razorpayOrderId");

-- CreateIndex
CREATE UNIQUE INDEX "Donation_razorpayPaymentId_key" ON "Donation"("razorpayPaymentId");

-- CreateIndex
CREATE UNIQUE INDEX "Donation_receiptNumber_key" ON "Donation"("receiptNumber");

-- CreateIndex
CREATE INDEX "Donation_status_idx" ON "Donation"("status");

-- CreateIndex
CREATE INDEX "Donation_category_idx" ON "Donation"("category");

-- CreateIndex
CREATE INDEX "Donation_createdAt_idx" ON "Donation"("createdAt");

-- CreateIndex
CREATE INDEX "Donation_memberId_idx" ON "Donation"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "Volunteer_memberId_key" ON "Volunteer"("memberId");

-- CreateIndex
CREATE INDEX "Volunteer_status_idx" ON "Volunteer"("status");

-- CreateIndex
CREATE INDEX "Volunteer_group_idx" ON "Volunteer"("group");

-- CreateIndex
CREATE INDEX "NewsItem_isPublished_idx" ON "NewsItem"("isPublished");

-- CreateIndex
CREATE INDEX "NewsItem_publishedAt_idx" ON "NewsItem"("publishedAt");

-- CreateIndex
CREATE INDEX "GalleryItem_albumId_idx" ON "GalleryItem"("albumId");

-- CreateIndex
CREATE INDEX "GalleryItem_type_idx" ON "GalleryItem"("type");

-- AddForeignKey
ALTER TABLE "EventRegistration" ADD CONSTRAINT "EventRegistration_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventRegistration" ADD CONSTRAINT "EventRegistration_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Volunteer" ADD CONSTRAINT "Volunteer_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GalleryItem" ADD CONSTRAINT "GalleryItem_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "GalleryAlbum"("id") ON DELETE SET NULL ON UPDATE CASCADE;

