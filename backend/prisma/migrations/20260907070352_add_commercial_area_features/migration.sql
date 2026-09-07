-- CreateTable
CREATE TABLE `CommercialAreaFeature` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `commercialId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CommercialAreaFeature` ADD CONSTRAINT `CommercialAreaFeature_commercialId_fkey` FOREIGN KEY (`commercialId`) REFERENCES `CommercialArea`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
