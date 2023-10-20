-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('subscriber', 'admin', 'serviceProvider', 'super_admin');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('active', 'deactive', 'pending', 'booked', 'finish');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "profileImage" TEXT,
    "address" TEXT,
    "contactNo" TEXT,
    "gender" "Gender",
    "dateOfBirth" TEXT,
    "role" "Role" NOT NULL,
    "bloodGroup" TEXT,
    "status" "Status" NOT NULL,
    "providerUid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "credential" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "credential_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "orderType" TEXT NOT NULL,
    "serviceArea" TEXT[],
    "details" TEXT NOT NULL,
    "serviceGuarantee" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "serviceItem" TEXT[],
    "inServicePackage" TEXT[],
    "thumbnail" TEXT NOT NULL,
    "serviceTypeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "serviceType" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "serviceProviderIds" TEXT[],

    CONSTRAINT "serviceType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "serviceProvider" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "serviceTypeId" TEXT NOT NULL,
    "availability" BOOLEAN NOT NULL,
    "status" "Status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "serviceProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriber" (
    "id" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shippingAddress" (
    "id" TEXT NOT NULL,
    "subscriberId" TEXT NOT NULL,
    "shippingNumber" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "town" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "contactNo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shippingAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" TEXT NOT NULL,
    "subscriberId" TEXT NOT NULL,
    "servicePlacedId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "servicePlaced" (
    "id" TEXT NOT NULL,
    "bookedDate" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "serviceProviderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "servicePlaced_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "orderId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "serviceProviderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media" (
    "id" TEXT NOT NULL,
    "public_id" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "secure_url" TEXT NOT NULL,
    "folder" TEXT,
    "original_filename" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_profileImage_key" ON "user"("profileImage");

-- CreateIndex
CREATE UNIQUE INDEX "user_providerUid_key" ON "user"("providerUid");

-- CreateIndex
CREATE UNIQUE INDEX "credential_userId_key" ON "credential"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "credential_email_key" ON "credential"("email");

-- CreateIndex
CREATE UNIQUE INDEX "service_title_key" ON "service"("title");

-- CreateIndex
CREATE UNIQUE INDEX "service_thumbnail_key" ON "service"("thumbnail");

-- CreateIndex
CREATE UNIQUE INDEX "service_serviceTypeId_key" ON "service"("serviceTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "serviceType_title_key" ON "serviceType"("title");

-- CreateIndex
CREATE UNIQUE INDEX "serviceType_serviceProviderIds_key" ON "serviceType"("serviceProviderIds");

-- CreateIndex
CREATE UNIQUE INDEX "serviceProvider_serviceTypeId_key" ON "serviceProvider"("serviceTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "subscriber_userId_key" ON "subscriber"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "servicePlaced_orderId_key" ON "servicePlaced"("orderId");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_profileImage_fkey" FOREIGN KEY ("profileImage") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credential" ADD CONSTRAINT "credential_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service" ADD CONSTRAINT "service_thumbnail_fkey" FOREIGN KEY ("thumbnail") REFERENCES "media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service" ADD CONSTRAINT "service_serviceTypeId_fkey" FOREIGN KEY ("serviceTypeId") REFERENCES "serviceType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "serviceProvider" ADD CONSTRAINT "serviceProvider_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "serviceProvider" ADD CONSTRAINT "serviceProvider_serviceTypeId_fkey" FOREIGN KEY ("serviceTypeId") REFERENCES "serviceType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriber" ADD CONSTRAINT "subscriber_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shippingAddress" ADD CONSTRAINT "shippingAddress_subscriberId_fkey" FOREIGN KEY ("subscriberId") REFERENCES "subscriber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_subscriberId_fkey" FOREIGN KEY ("subscriberId") REFERENCES "subscriber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servicePlaced" ADD CONSTRAINT "servicePlaced_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servicePlaced" ADD CONSTRAINT "servicePlaced_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servicePlaced" ADD CONSTRAINT "servicePlaced_serviceProviderId_fkey" FOREIGN KEY ("serviceProviderId") REFERENCES "serviceProvider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_serviceProviderId_fkey" FOREIGN KEY ("serviceProviderId") REFERENCES "serviceProvider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
