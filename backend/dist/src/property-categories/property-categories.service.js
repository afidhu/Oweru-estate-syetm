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
exports.PropertyCategoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.config/prisma.service");
let PropertyCategoriesService = class PropertyCategoriesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPropertyCategoryDto) {
        const category = await this.prisma.propertyCategory.create({
            data: createPropertyCategoryDto
        });
        return category;
    }
    async findAll() {
        const categories = await this.prisma.propertyCategory.findMany();
        return categories;
    }
    async findOne(id) {
        const category = await this.prisma.propertyCategory.findUnique({
            where: {
                id
            }
        });
        return category;
    }
    async update(id, updatePropertyCategoryDto) {
        const category = await this.prisma.propertyCategory.update({
            where: {
                id
            },
            data: updatePropertyCategoryDto
        });
        return category;
    }
    async remove(id) {
        const category = await this.prisma.propertyCategory.delete({
            where: {
                id
            }
        });
        return category;
    }
};
exports.PropertyCategoriesService = PropertyCategoriesService;
exports.PropertyCategoriesService = PropertyCategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PropertyCategoriesService);
//# sourceMappingURL=property-categories.service.js.map