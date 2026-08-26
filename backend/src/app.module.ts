
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma.config/prisma.module';
import { PrismaService } from './prisma.config/prisma.service';
import { PropertyCategoriesModule } from './property-categories/property-categories.module';
import { HouseTypesModule } from './house-types/house-types.module';
import { LandTypesModule } from './land-types/land-types.module';
import { RegionsModule } from './regions/regions.module';
import { DistrictsModule } from './districts/districts.module';
import { WardsModule } from './wards/wards.module';
import { BrokersModule } from './brokers/brokers.module';
import { OwnersModule } from './owners/owners.module';
// import { DealsModule } from './deals/deals.module';
import { CommissionsModule } from './commissions/commissions.module';
import { HouseForSaleModule } from './house-for-sale/house-for-sale.module';
import { HouseForSaleFeatureModule } from './house-for-sale-feature/house-for-sale-feature.module';
import { HouseForSaleImageModule } from './house-for-sale-image/house-for-sale-image.module';
import { HouseForSaleDocumentModule } from './house-for-sale-document/house-for-sale-document.module';
import { LandForSaleModule } from './land-for-sale/land-for-sale.module';
import { LandForSaleFeatureModule } from './land-for-sale-feature/land-for-sale-feature.module';
import { LandForSaleImageModule } from './land-for-sale-image/land-for-sale-image.module';
import { LandForSaleDocumentModule } from './land-for-sale-document/land-for-sale-document.module';
import { CommercialAreaModule } from './commercial-area/commercial-area.module';
import { CommercialAreaPropertyTypeModule } from './commercial-area-property-type/commercial-area-property-type.module';
import { CommercialAreaImageModule } from './commercial-area-image/commercial-area-image.module';
import { CommercialAreaDocumentModule } from './commercial-area-document/commercial-area-document.module';

@Module({
  imports: [ PrismaModule,AuthModule, UsersModule, PropertyCategoriesModule, HouseTypesModule, LandTypesModule, RegionsModule, DistrictsModule, WardsModule, BrokersModule, OwnersModule, CommissionsModule, HouseForSaleModule, HouseForSaleFeatureModule, HouseForSaleImageModule, HouseForSaleDocumentModule, LandForSaleModule, LandForSaleFeatureModule, LandForSaleImageModule, LandForSaleDocumentModule, CommercialAreaModule, CommercialAreaPropertyTypeModule, CommercialAreaImageModule, CommercialAreaDocumentModule,],
  controllers: [AppController],
  providers: [ PrismaService,AppService],
})
export class AppModule {}
