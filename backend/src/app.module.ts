
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
import { PropertyTypesModule } from './property-types/property-types.module';
import { FeaturesModule } from './features/features.module';
import { RegionsModule } from './regions/regions.module';
import { DistrictsModule } from './districts/districts.module';
import { WardsModule } from './wards/wards.module';
import { BrokersModule } from './brokers/brokers.module';
import { OwnersModule } from './owners/owners.module';
import { PropertiesModule } from './properties/properties.module';
import { PropertyFeaturesModule } from './property-features/property-features.module';
import { PropertyImagesModule } from './property-images/property-images.module';
import { PropertyDocumentsModule } from './property-documents/property-documents.module';
import { DealsModule } from './deals/deals.module';
import { CommissionsModule } from './commissions/commissions.module';

@Module({
  imports: [ PrismaModule,AuthModule, UsersModule, PropertyCategoriesModule, HouseTypesModule, LandTypesModule, PropertyTypesModule, FeaturesModule, RegionsModule, DistrictsModule, WardsModule, BrokersModule, OwnersModule, PropertiesModule, PropertyFeaturesModule, PropertyImagesModule, PropertyDocumentsModule, DealsModule, CommissionsModule,],
  controllers: [AppController],
  providers: [ PrismaService,AppService],
})
export class AppModule {}
