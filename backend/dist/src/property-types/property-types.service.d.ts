import { CreatePropertyTypeDto } from './dto/create-property-type.dto';
import { UpdatePropertyTypeDto } from './dto/update-property-type.dto';
import { PrismaService } from "../prisma.config/prisma.service";
export declare class PropertyTypesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createPropertyTypeDto: CreatePropertyTypeDto): import("@prisma/client").Prisma.Prisma__PropertyTypeClient<{
        id: string;
        name: string;
        group: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        group: string;
    }[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__PropertyTypeClient<{
        id: string;
        name: string;
        group: string;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updatePropertyTypeDto: UpdatePropertyTypeDto): import("@prisma/client").Prisma.Prisma__PropertyTypeClient<{
        id: string;
        name: string;
        group: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import("@prisma/client").Prisma.Prisma__PropertyTypeClient<{
        id: string;
        name: string;
        group: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
