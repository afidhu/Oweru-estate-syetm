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
exports.PropertyDocumentsController = void 0;
const common_1 = require("@nestjs/common");
const property_documents_service_1 = require("./property-documents.service");
const create_property_document_dto_1 = require("./dto/create-property-document.dto");
const update_property_document_dto_1 = require("./dto/update-property-document.dto");
let PropertyDocumentsController = class PropertyDocumentsController {
    propertyDocumentsService;
    constructor(propertyDocumentsService) {
        this.propertyDocumentsService = propertyDocumentsService;
    }
    create(createPropertyDocumentDto) {
        return this.propertyDocumentsService.create(createPropertyDocumentDto);
    }
    findAll() {
        return this.propertyDocumentsService.findAll();
    }
    findOne(id) {
        return this.propertyDocumentsService.findOne(+id);
    }
    update(id, updatePropertyDocumentDto) {
        return this.propertyDocumentsService.update(+id, updatePropertyDocumentDto);
    }
    remove(id) {
        return this.propertyDocumentsService.remove(+id);
    }
};
exports.PropertyDocumentsController = PropertyDocumentsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_property_document_dto_1.CreatePropertyDocumentDto]),
    __metadata("design:returntype", void 0)
], PropertyDocumentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PropertyDocumentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PropertyDocumentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_property_document_dto_1.UpdatePropertyDocumentDto]),
    __metadata("design:returntype", void 0)
], PropertyDocumentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PropertyDocumentsController.prototype, "remove", null);
exports.PropertyDocumentsController = PropertyDocumentsController = __decorate([
    (0, common_1.Controller)('property-documents'),
    __metadata("design:paramtypes", [property_documents_service_1.PropertyDocumentsService])
], PropertyDocumentsController);
//# sourceMappingURL=property-documents.controller.js.map