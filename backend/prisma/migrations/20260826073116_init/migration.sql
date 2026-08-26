-- CreateTable
CREATE TABLE `PropertyCategory` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `icon` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PropertyCategory_title_key`(`title`),
    UNIQUE INDEX `PropertyCategory_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HouseType` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `HouseType_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LandType` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `LandType_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PropertyType` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `group` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `PropertyType_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Region` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Region_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `District` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `regionId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `District_name_regionId_key`(`name`, `regionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ward` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `districtId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Ward_name_districtId_key`(`name`, `districtId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Broker` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Owner` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HouseForSale` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `salePrice` DECIMAL(14, 2) NOT NULL,
    `sizeUnit` VARCHAR(191) NULL,
    `size` DECIMAL(12, 2) NULL,
    `houseTypeId` VARCHAR(191) NULL,
    `bedrooms` INTEGER NULL,
    `bathrooms` INTEGER NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'ACTIVE',
    `propertyCategoryId` VARCHAR(191) NULL,
    `brokerId` VARCHAR(191) NULL,
    `ownerId` VARCHAR(191) NULL,
    `regionId` VARCHAR(191) NULL,
    `districtId` VARCHAR(191) NULL,
    `wardId` VARCHAR(191) NULL,
    `exactLocation` VARCHAR(191) NULL,
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,
    `description` TEXT NULL,
    `language` VARCHAR(191) NOT NULL DEFAULT 'ENGLISH',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `HouseForSale_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HouseForSaleFeature` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `houseId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HouseForSaleImage` (
    `id` VARCHAR(191) NOT NULL,
    `houseId` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `isCover` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HouseForSaleDocument` (
    `id` VARCHAR(191) NOT NULL,
    `houseId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `fileType` VARCHAR(191) NULL,
    `sizeBytes` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LandForSale` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `salePrice` DECIMAL(14, 2) NOT NULL,
    `sizeUnit` VARCHAR(191) NULL,
    `size` DECIMAL(12, 2) NULL,
    `landTypeId` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'ACTIVE',
    `propertyCategoryId` VARCHAR(191) NULL,
    `brokerId` VARCHAR(191) NULL,
    `ownerId` VARCHAR(191) NULL,
    `regionId` VARCHAR(191) NULL,
    `districtId` VARCHAR(191) NULL,
    `wardId` VARCHAR(191) NULL,
    `exactLocation` VARCHAR(191) NULL,
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,
    `description` TEXT NULL,
    `language` VARCHAR(191) NOT NULL DEFAULT 'ENGLISH',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `LandForSale_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LandForSaleFeature` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `landId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LandForSaleImage` (
    `id` VARCHAR(191) NOT NULL,
    `landId` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `isCover` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LandForSaleDocument` (
    `id` VARCHAR(191) NOT NULL,
    `landId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `fileType` VARCHAR(191) NULL,
    `sizeBytes` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CommercialArea` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `listingType` VARCHAR(191) NOT NULL,
    `salePrice` DECIMAL(14, 2) NULL,
    `monthlyRent` DECIMAL(14, 2) NULL,
    `rentalTerm` VARCHAR(191) NULL,
    `sizeUnit` VARCHAR(191) NULL,
    `size` DECIMAL(12, 2) NULL,
    `propertyTypeId` VARCHAR(191) NULL,
    `propertyCategoryId` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'ACTIVE',
    `brokerId` VARCHAR(191) NULL,
    `ownerId` VARCHAR(191) NULL,
    `regionId` VARCHAR(191) NULL,
    `districtId` VARCHAR(191) NULL,
    `wardId` VARCHAR(191) NULL,
    `exactLocation` VARCHAR(191) NULL,
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,
    `description` TEXT NULL,
    `language` VARCHAR(191) NOT NULL DEFAULT 'ENGLISH',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `CommercialArea_status_listingType_idx`(`status`, `listingType`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CommercialAreaImage` (
    `id` VARCHAR(191) NOT NULL,
    `commercialId` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `isCover` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CommercialAreaDocument` (
    `id` VARCHAR(191) NOT NULL,
    `commercialId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `fileType` VARCHAR(191) NULL,
    `sizeBytes` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `District` ADD CONSTRAINT `District_regionId_fkey` FOREIGN KEY (`regionId`) REFERENCES `Region`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ward` ADD CONSTRAINT `Ward_districtId_fkey` FOREIGN KEY (`districtId`) REFERENCES `District`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HouseForSale` ADD CONSTRAINT `HouseForSale_houseTypeId_fkey` FOREIGN KEY (`houseTypeId`) REFERENCES `HouseType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HouseForSale` ADD CONSTRAINT `HouseForSale_propertyCategoryId_fkey` FOREIGN KEY (`propertyCategoryId`) REFERENCES `PropertyCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HouseForSale` ADD CONSTRAINT `HouseForSale_brokerId_fkey` FOREIGN KEY (`brokerId`) REFERENCES `Broker`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HouseForSale` ADD CONSTRAINT `HouseForSale_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `Owner`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HouseForSale` ADD CONSTRAINT `HouseForSale_regionId_fkey` FOREIGN KEY (`regionId`) REFERENCES `Region`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HouseForSale` ADD CONSTRAINT `HouseForSale_districtId_fkey` FOREIGN KEY (`districtId`) REFERENCES `District`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HouseForSale` ADD CONSTRAINT `HouseForSale_wardId_fkey` FOREIGN KEY (`wardId`) REFERENCES `Ward`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HouseForSaleFeature` ADD CONSTRAINT `HouseForSaleFeature_houseId_fkey` FOREIGN KEY (`houseId`) REFERENCES `HouseForSale`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HouseForSaleImage` ADD CONSTRAINT `HouseForSaleImage_houseId_fkey` FOREIGN KEY (`houseId`) REFERENCES `HouseForSale`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HouseForSaleDocument` ADD CONSTRAINT `HouseForSaleDocument_houseId_fkey` FOREIGN KEY (`houseId`) REFERENCES `HouseForSale`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LandForSale` ADD CONSTRAINT `LandForSale_landTypeId_fkey` FOREIGN KEY (`landTypeId`) REFERENCES `LandType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LandForSale` ADD CONSTRAINT `LandForSale_propertyCategoryId_fkey` FOREIGN KEY (`propertyCategoryId`) REFERENCES `PropertyCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LandForSale` ADD CONSTRAINT `LandForSale_brokerId_fkey` FOREIGN KEY (`brokerId`) REFERENCES `Broker`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LandForSale` ADD CONSTRAINT `LandForSale_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `Owner`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LandForSale` ADD CONSTRAINT `LandForSale_regionId_fkey` FOREIGN KEY (`regionId`) REFERENCES `Region`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LandForSale` ADD CONSTRAINT `LandForSale_districtId_fkey` FOREIGN KEY (`districtId`) REFERENCES `District`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LandForSale` ADD CONSTRAINT `LandForSale_wardId_fkey` FOREIGN KEY (`wardId`) REFERENCES `Ward`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LandForSaleFeature` ADD CONSTRAINT `LandForSaleFeature_landId_fkey` FOREIGN KEY (`landId`) REFERENCES `LandForSale`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LandForSaleImage` ADD CONSTRAINT `LandForSaleImage_landId_fkey` FOREIGN KEY (`landId`) REFERENCES `LandForSale`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LandForSaleDocument` ADD CONSTRAINT `LandForSaleDocument_landId_fkey` FOREIGN KEY (`landId`) REFERENCES `LandForSale`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommercialArea` ADD CONSTRAINT `CommercialArea_propertyTypeId_fkey` FOREIGN KEY (`propertyTypeId`) REFERENCES `PropertyType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommercialArea` ADD CONSTRAINT `CommercialArea_propertyCategoryId_fkey` FOREIGN KEY (`propertyCategoryId`) REFERENCES `PropertyCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommercialArea` ADD CONSTRAINT `CommercialArea_brokerId_fkey` FOREIGN KEY (`brokerId`) REFERENCES `Broker`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommercialArea` ADD CONSTRAINT `CommercialArea_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `Owner`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommercialArea` ADD CONSTRAINT `CommercialArea_regionId_fkey` FOREIGN KEY (`regionId`) REFERENCES `Region`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommercialArea` ADD CONSTRAINT `CommercialArea_districtId_fkey` FOREIGN KEY (`districtId`) REFERENCES `District`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommercialArea` ADD CONSTRAINT `CommercialArea_wardId_fkey` FOREIGN KEY (`wardId`) REFERENCES `Ward`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommercialAreaImage` ADD CONSTRAINT `CommercialAreaImage_commercialId_fkey` FOREIGN KEY (`commercialId`) REFERENCES `CommercialArea`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommercialAreaDocument` ADD CONSTRAINT `CommercialAreaDocument_commercialId_fkey` FOREIGN KEY (`commercialId`) REFERENCES `CommercialArea`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
