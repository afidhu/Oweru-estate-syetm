import { PropertyTypesService } from './property-types.service';
import { CreatePropertyTypeDto } from './dto/create-property-type.dto';
import { UpdatePropertyTypeDto } from './dto/update-property-type.dto';
export declare class PropertyTypesController {
    private readonly propertyTypesService;
    constructor(propertyTypesService: PropertyTypesService);
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
    findOne(id: string): import("@prisma/client").Prisma.Prisma__PropertyTypeClient<{
        id: string;
        name: string;
        group: string;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updatePropertyTypeDto: UpdatePropertyTypeDto): import("@prisma/client").Prisma.Prisma__PropertyTypeClient<{
        id: string;
        name: string;
        group: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__PropertyTypeClient<{
        id: string;
        name: string;
        group: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
