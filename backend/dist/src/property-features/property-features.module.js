"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyFeaturesModule = void 0;
const common_1 = require("@nestjs/common");
const property_features_service_1 = require("./property-features.service");
const property_features_controller_1 = require("./property-features.controller");
let PropertyFeaturesModule = class PropertyFeaturesModule {
};
exports.PropertyFeaturesModule = PropertyFeaturesModule;
exports.PropertyFeaturesModule = PropertyFeaturesModule = __decorate([
    (0, common_1.Module)({
        controllers: [property_features_controller_1.PropertyFeaturesController],
        providers: [property_features_service_1.PropertyFeaturesService],
    })
], PropertyFeaturesModule);
//# sourceMappingURL=property-features.module.js.map