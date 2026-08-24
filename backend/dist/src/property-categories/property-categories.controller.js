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
exports.PropertyCategoriesController = void 0;
const common_1 = require("@nestjs/common");
const property_categories_service_1 = require("./property-categories.service");
const create_property_category_dto_1 = require("./dto/create-property-category.dto");
const update_property_category_dto_1 = require("./dto/update-property-category.dto");
let PropertyCategoriesController = class PropertyCategoriesController {
    propertyCategoriesService;
    constructor(propertyCategoriesService) {
        this.propertyCategoriesService = propertyCategoriesService;
    }
    create(createPropertyCategoryDto) {
        return this.propertyCategoriesService.create(createPropertyCategoryDto);
    }
    findAll() {
        return this.propertyCategoriesService.findAll();
    }
    findOne(id) {
        return this.propertyCategoriesService.findOne(id);
    }
    update(id, updatePropertyCategoryDto) {
        return this.propertyCategoriesService.update(id, updatePropertyCategoryDto);
    }
    remove(id) {
        return this.propertyCategoriesService.remove(id);
    }
};
exports.PropertyCategoriesController = PropertyCategoriesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_property_category_dto_1.CreatePropertyCategoryDto]),
    __metadata("design:returntype", void 0)
], PropertyCategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PropertyCategoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PropertyCategoriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_property_category_dto_1.UpdatePropertyCategoryDto]),
    __metadata("design:returntype", void 0)
], PropertyCategoriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PropertyCategoriesController.prototype, "remove", null);
exports.PropertyCategoriesController = PropertyCategoriesController = __decorate([
    (0, common_1.Controller)('property-categories'),
    __metadata("design:paramtypes", [property_categories_service_1.PropertyCategoriesService])
], PropertyCategoriesController);
//# sourceMappingURL=property-categories.controller.js.map