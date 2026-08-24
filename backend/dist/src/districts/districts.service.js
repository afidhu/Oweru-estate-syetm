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
exports.DistrictsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.config/prisma.service");
let DistrictsService = class DistrictsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createDistrictDto) {
        return this.prisma.district.create({
            data: createDistrictDto,
        });
    }
    findAll() {
        return this.prisma.district.findMany();
    }
    findOne(id) {
        return this.prisma.district.findUnique({
            where: { id: id.toString() },
        });
    }
    update(id, updateDistrictDto) {
        return this.prisma.district.update({
            where: { id: id.toString() },
            data: updateDistrictDto,
        });
    }
    remove(id) {
        return this.prisma.district.delete({
            where: { id: id.toString() },
        });
    }
};
exports.DistrictsService = DistrictsService;
exports.DistrictsService = DistrictsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DistrictsService);
//# sourceMappingURL=districts.service.js.map