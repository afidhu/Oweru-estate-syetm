"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePropertyCategoryDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_property_category_dto_1 = require("./create-property-category.dto");
class UpdatePropertyCategoryDto extends (0, mapped_types_1.PartialType)(create_property_category_dto_1.CreatePropertyCategoryDto) {
}
exports.UpdatePropertyCategoryDto = UpdatePropertyCategoryDto;
//# sourceMappingURL=update-property-category.dto.js.map