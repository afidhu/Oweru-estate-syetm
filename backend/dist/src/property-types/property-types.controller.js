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
exports.PropertyTypesController = void 0;
const common_1 = require("@nestjs/common");
const property_types_service_1 = require("./property-types.service");
const create_property_type_dto_1 = require("./dto/create-property-type.dto");
const update_property_type_dto_1 = require("./dto/update-property-type.dto");
let PropertyTypesController = class PropertyTypesController {
    propertyTypesService;
    constructor(propertyTypesService) {
        this.propertyTypesService = propertyTypesService;
    }
    create(createPropertyTypeDto) {
        return this.propertyTypesService.create(createPropertyTypeDto);
    }
    findAll() {
        return this.propertyTypesService.findAll();
    }
    findOne(id) {
        return this.propertyTypesService.findOne(+id);
    }
    update(id, updatePropertyTypeDto) {
        return this.propertyTypesService.update(+id, updatePropertyTypeDto);
    }
    remove(id) {
        return this.propertyTypesService.remove(+id);
    }
};
exports.PropertyTypesController = PropertyTypesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_property_type_dto_1.CreatePropertyTypeDto]),
    __metadata("design:returntype", void 0)
], PropertyTypesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PropertyTypesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PropertyTypesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_property_type_dto_1.UpdatePropertyTypeDto]),
    __metadata("design:returntype", void 0)
], PropertyTypesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PropertyTypesController.prototype, "remove", null);
exports.PropertyTypesController = PropertyTypesController = __decorate([
    (0, common_1.Controller)('property-types'),
    __metadata("design:paramtypes", [property_types_service_1.PropertyTypesService])
], PropertyTypesController);
//# sourceMappingURL=property-types.controller.js.map