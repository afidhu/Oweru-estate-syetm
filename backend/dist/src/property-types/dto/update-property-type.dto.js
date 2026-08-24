"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePropertyTypeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_property_type_dto_1 = require("./create-property-type.dto");
class UpdatePropertyTypeDto extends (0, mapped_types_1.PartialType)(create_property_type_dto_1.CreatePropertyTypeDto) {
}
exports.UpdatePropertyTypeDto = UpdatePropertyTypeDto;
//# sourceMappingURL=update-property-type.dto.js.map