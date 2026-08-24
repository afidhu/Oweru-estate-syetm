"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyFeaturesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.config/prisma.service");
let PropertyFeaturesService = class PropertyFeaturesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createPropertyFeatureDto) {
        return this.prisma.propertyFeature.create({
            data: createPropertyFeatureDto,
        });
    }
    findAll() {
        return this.prisma.propertyFeature.findMany();
    }
    findOne(id) {
        return this.prisma.propertyFeature.findUnique({
            where: { id: id.toString() },
        });
    }
    update(id, updatePropertyFeatureDto) {
        return this.prisma.propertyFeature.update({
            where: { id: id.toString() },
            data: updatePropertyFeatureDto,
        });
    }
    remove(id) {
        return this.prisma.propertyFeature.delete({
            where: { id: id.toString() },
        });
    }
};
exports.PropertyFeaturesService = PropertyFeaturesService;
exports.PropertyFeaturesService = PropertyFeaturesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PropertyFeaturesService);
//# sourceMappingURL=property-features.service.js.map