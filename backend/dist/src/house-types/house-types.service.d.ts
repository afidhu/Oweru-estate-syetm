import { CreateHouseTypeDto } from './dto/create-house-type.dto';
import { UpdateHouseTypeDto } from './dto/update-house-type.dto';
import { PrismaService } from "../prisma.config/prisma.service";
export declare class HouseTypesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createHouseTypeDto: CreateHouseTypeDto): import("@prisma/client").Prisma.Prisma__HouseTypeClient<{
        id: string;
        name: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
    }[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__HouseTypeClient<{
        id: string;
        name: string;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updateHouseTypeDto: UpdateHouseTypeDto): import("@prisma/client").Prisma.Prisma__HouseTypeClient<{
        id: string;
        name: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import("@prisma/client").Prisma.Prisma__HouseTypeClient<{
        id: string;
        name: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
