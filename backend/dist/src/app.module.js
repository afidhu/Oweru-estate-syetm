"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const prisma_module_1 = require("./prisma.config/prisma.module");
const prisma_service_1 = require("./prisma.config/prisma.service");
const property_categories_module_1 = require("./property-categories/property-categories.module");
const house_types_module_1 = require("./house-types/house-types.module");
const land_types_module_1 = require("./land-types/land-types.module");
const property_types_module_1 = require("./property-types/property-types.module");
const features_module_1 = require("./features/features.module");
const regions_module_1 = require("./regions/regions.module");
const districts_module_1 = require("./districts/districts.module");
const wards_module_1 = require("./wards/wards.module");
const brokers_module_1 = require("./brokers/brokers.module");
const owners_module_1 = require("./owners/owners.module");
const properties_module_1 = require("./properties/properties.module");
const property_features_module_1 = require("./property-features/property-features.module");
const property_images_module_1 = require("./property-images/property-images.module");
const property_documents_module_1 = require("./property-documents/property-documents.module");
const deals_module_1 = require("./deals/deals.module");
const commissions_module_1 = require("./commissions/commissions.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, auth_module_1.AuthModule, users_module_1.UsersModule, property_categories_module_1.PropertyCategoriesModule, house_types_module_1.HouseTypesModule, land_types_module_1.LandTypesModule, property_types_module_1.PropertyTypesModule, features_module_1.FeaturesModule, regions_module_1.RegionsModule, districts_module_1.DistrictsModule, wards_module_1.WardsModule, brokers_module_1.BrokersModule, owners_module_1.OwnersModule, properties_module_1.PropertiesModule, property_features_module_1.PropertyFeaturesModule, property_images_module_1.PropertyImagesModule, property_documents_module_1.PropertyDocumentsModule, deals_module_1.DealsModule, commissions_module_1.CommissionsModule,],
        controllers: [app_controller_1.AppController],
        providers: [prisma_service_1.PrismaService, app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map