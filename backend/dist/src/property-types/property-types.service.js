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
exports.PropertyTypesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.config/prisma.service");
let PropertyTypesService = class PropertyTypesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createPropertyTypeDto) {
        return this.prisma.propertyType.create({
            data: createPropertyTypeDto,
        });
    }
    findAll() {
        return this.prisma.propertyType.findMany();
    }
    findOne(id) {
        return this.prisma.propertyType.findUnique({
            where: { id: id.toString() },
        });
    }
    update(id, updatePropertyTypeDto) {
        return this.prisma.propertyType.update({
            where: { id: id.toString() },
            data: updatePropertyTypeDto,
        });
    }
    remove(id) {
        return this.prisma.propertyType.delete({
            where: { id: id.toString() },
        });
    }
};
exports.PropertyTypesService = PropertyTypesService;
exports.PropertyTypesService = PropertyTypesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PropertyTypesService);
//# sourceMappingURL=property-types.service.js.map