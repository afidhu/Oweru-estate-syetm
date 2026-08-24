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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WardsController = void 0;
const common_1 = require("@nestjs/common");
const wards_service_1 = require("./wards.service");
const create_ward_dto_1 = require("./dto/create-ward.dto");
const update_ward_dto_1 = require("./dto/update-ward.dto");
let WardsController = class WardsController {
    wardsService;
    constructor(wardsService) {
        this.wardsService = wardsService;
    }
    create(createWardDto) {
        return this.wardsService.create(createWardDto);
    }
    findAll() {
        return this.wardsService.findAll();
    }
    findOne(id) {
        return this.wardsService.findOne(+id);
    }
    update(id, updateWardDto) {
        return this.wardsService.update(+id, updateWardDto);
    }
    remove(id) {
        return this.wardsService.remove(+id);
    }
};
exports.WardsController = WardsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ward_dto_1.CreateWardDto]),
    __metadata("design:returntype", void 0)
], WardsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WardsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WardsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_ward_dto_1.UpdateWardDto]),
    __metadata("design:returntype", void 0)
], WardsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WardsController.prototype, "remove", null);
exports.WardsController = WardsController = __decorate([
    (0, common_1.Controller)('wards'),
    __metadata("design:paramtypes", [wards_service_1.WardsService])
], WardsController);
//# sourceMappingURL=wards.controller.js.map