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
const regions_module_1 = require("./regions/regions.module");
const districts_module_1 = require("./districts/districts.module");
const wards_module_1 = require("./wards/wards.module");
const brokers_module_1 = require("./brokers/brokers.module");
const owners_module_1 = require("./owners/owners.module");
const commissions_module_1 = require("./commissions/commissions.module");
const house_for_sale_module_1 = require("./house-for-sale/house-for-sale.module");
const house_for_sale_feature_module_1 = require("./house-for-sale-feature/house-for-sale-feature.module");
const house_for_sale_image_module_1 = require("./house-for-sale-image/house-for-sale-image.module");
const house_for_sale_document_module_1 = require("./house-for-sale-document/house-for-sale-document.module");
const land_for_sale_module_1 = require("./land-for-sale/land-for-sale.module");
const land_for_sale_feature_module_1 = require("./land-for-sale-feature/land-for-sale-feature.module");
const land_for_sale_image_module_1 = require("./land-for-sale-image/land-for-sale-image.module");
const land_for_sale_document_module_1 = require("./land-for-sale-document/land-for-sale-document.module");
const commercial_area_module_1 = require("./commercial-area/commercial-area.module");
const commercial_area_property_type_module_1 = require("./commercial-area-property-type/commercial-area-property-type.module");
const commercial_area_image_module_1 = require("./commercial-area-image/commercial-area-image.module");
const commercial_area_document_module_1 = require("./commercial-area-document/commercial-area-document.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, auth_module_1.AuthModule, users_module_1.UsersModule, property_categories_module_1.PropertyCategoriesModule, house_types_module_1.HouseTypesModule, land_types_module_1.LandTypesModule, regions_module_1.RegionsModule, districts_module_1.DistrictsModule, wards_module_1.WardsModule, brokers_module_1.BrokersModule, owners_module_1.OwnersModule, commissions_module_1.CommissionsModule, house_for_sale_module_1.HouseForSaleModule, house_for_sale_feature_module_1.HouseForSaleFeatureModule, house_for_sale_image_module_1.HouseForSaleImageModule, house_for_sale_document_module_1.HouseForSaleDocumentModule, land_for_sale_module_1.LandForSaleModule, land_for_sale_feature_module_1.LandForSaleFeatureModule, land_for_sale_image_module_1.LandForSaleImageModule, land_for_sale_document_module_1.LandForSaleDocumentModule, commercial_area_module_1.CommercialAreaModule, commercial_area_property_type_module_1.CommercialAreaPropertyTypeModule, commercial_area_image_module_1.CommercialAreaImageModule, commercial_area_document_module_1.CommercialAreaDocumentModule,],
        controllers: [app_controller_1.AppController],
        providers: [prisma_service_1.PrismaService, app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map