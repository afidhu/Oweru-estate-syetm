"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePropertyImageDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_property_image_dto_1 = require("./create-property-image.dto");
class UpdatePropertyImageDto extends (0, mapped_types_1.PartialType)(create_property_image_dto_1.CreatePropertyImageDto) {
}
exports.UpdatePropertyImageDto = UpdatePropertyImageDto;
//# sourceMappingURL=update-property-image.dto.js.map