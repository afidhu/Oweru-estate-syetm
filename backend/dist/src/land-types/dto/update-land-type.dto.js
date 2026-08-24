"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLandTypeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_land_type_dto_1 = require("./create-land-type.dto");
class UpdateLandTypeDto extends (0, mapped_types_1.PartialType)(create_land_type_dto_1.CreateLandTypeDto) {
}
exports.UpdateLandTypeDto = UpdateLandTypeDto;
//# sourceMappingURL=update-land-type.dto.js.map