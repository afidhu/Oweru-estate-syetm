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
exports.LandTypesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.config/prisma.service");
let LandTypesService = class LandTypesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createLandTypeDto) {
        return this.prisma.landType.create({
            data: createLandTypeDto,
        });
    }
    findAll() {
        return this.prisma.landType.findMany();
    }
    findOne(id) {
        return this.prisma.landType.findUnique({
            where: { id: id.toString() },
        });
    }
    update(id, updateLandTypeDto) {
        return this.prisma.landType.update({
            where: { id: id.toString() },
            data: updateLandTypeDto,
        });
    }
    remove(id) {
        return this.prisma.landType.delete({
            where: { id: id.toString() },
        });
    }
};
exports.LandTypesService = LandTypesService;
exports.LandTypesService = LandTypesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LandTypesService);
//# sourceMappingURL=land-types.service.js.map