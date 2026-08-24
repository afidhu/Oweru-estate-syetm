"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHouseTypeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_house_type_dto_1 = require("./create-house-type.dto");
class UpdateHouseTypeDto extends (0, mapped_types_1.PartialType)(create_house_type_dto_1.CreateHouseTypeDto) {
}
exports.UpdateHouseTypeDto = UpdateHouseTypeDto;
//# sourceMappingURL=update-house-type.dto.js.map