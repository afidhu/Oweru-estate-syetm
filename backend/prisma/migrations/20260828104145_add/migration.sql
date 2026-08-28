-- CreateTable
CREATE TABLE `HouseForSaleVideo` (
    `id` VARCHAR(191) NOT NULL,
    `houseId` VARCHAR(191) NOT NULL,
    `url` LONGTEXT NOT NULL,
    `fileType` VARCHAR(191) NULL,
    `sizeBytes` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LandForSaleVideo` (
    `id` VARCHAR(191) NOT NULL,
    `landId` VARCHAR(191) NOT NULL,
    `url` LONGTEXT NOT NULL,
    `fileType` VARCHAR(191) NULL,
    `sizeBytes` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CommercialAreaVideo` (
    `id` VARCHAR(191) NOT NULL,
    `commercialId` VARCHAR(191) NOT NULL,
    `url` LONGTEXT NOT NULL,
    `fileType` VARCHAR(191) NULL,
    `sizeBytes` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `HouseForSaleVideo` ADD CONSTRAINT `HouseForSaleVideo_houseId_fkey` FOREIGN KEY (`houseId`) REFERENCES `HouseForSale`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LandForSaleVideo` ADD CONSTRAINT `LandForSaleVideo_landId_fkey` FOREIGN KEY (`landId`) REFERENCES `LandForSale`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommercialAreaVideo` ADD CONSTRAINT `CommercialAreaVideo_commercialId_fkey` FOREIGN KEY (`commercialId`) REFERENCES `CommercialArea`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
