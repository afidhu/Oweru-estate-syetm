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
exports.PropertyImagesController = void 0;
const common_1 = require("@nestjs/common");
const property_images_service_1 = require("./property-images.service");
const create_property_image_dto_1 = require("./dto/create-property-image.dto");
const update_property_image_dto_1 = require("./dto/update-property-image.dto");
let PropertyImagesController = class PropertyImagesController {
    propertyImagesService;
    constructor(propertyImagesService) {
        this.propertyImagesService = propertyImagesService;
    }
    create(createPropertyImageDto) {
        return this.propertyImagesService.create(createPropertyImageDto);
    }
    findAll() {
        return this.propertyImagesService.findAll();
    }
    findOne(id) {
        return this.propertyImagesService.findOne(+id);
    }
    update(id, updatePropertyImageDto) {
        return this.propertyImagesService.update(+id, updatePropertyImageDto);
    }
    remove(id) {
        return this.propertyImagesService.remove(+id);
    }
};
exports.PropertyImagesController = PropertyImagesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_property_image_dto_1.CreatePropertyImageDto]),
    __metadata("design:returntype", void 0)
], PropertyImagesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PropertyImagesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PropertyImagesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_property_image_dto_1.UpdatePropertyImageDto]),
    __metadata("design:returntype", void 0)
], PropertyImagesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PropertyImagesController.prototype, "remove", null);
exports.PropertyImagesController = PropertyImagesController = __decorate([
    (0, common_1.Controller)('property-images'),
    __metadata("design:paramtypes", [property_images_service_1.PropertyImagesService])
], PropertyImagesController);
//# sourceMappingURL=property-images.controller.js.map