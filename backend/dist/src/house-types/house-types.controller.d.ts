import { HouseTypesService } from './house-types.service';
import { CreateHouseTypeDto } from './dto/create-house-type.dto';
import { UpdateHouseTypeDto } from './dto/update-house-type.dto';
export declare class HouseTypesController {
    private readonly houseTypesService;
    constructor(houseTypesService: HouseTypesService);
    create(createHouseTypeDto: CreateHouseTypeDto): import("@prisma/client").Prisma.Prisma__HouseTypeClient<{
        id: string;
        name: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__HouseTypeClient<{
        id: string;
        name: string;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateHouseTypeDto: UpdateHouseTypeDto): import("@prisma/client").Prisma.Prisma__HouseTypeClient<{
        id: string;
        name: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__HouseTypeClient<{
        id: string;
        name: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
