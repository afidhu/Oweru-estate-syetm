import { CreateLandTypeDto } from './dto/create-land-type.dto';
import { UpdateLandTypeDto } from './dto/update-land-type.dto';
import { PrismaService } from '../prisma.config/prisma.service';
export declare class LandTypesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createLandTypeDto: CreateLandTypeDto): import("@prisma/client").Prisma.Prisma__LandTypeClient<{
        id: string;
        name: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
    }[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__LandTypeClient<{
        id: string;
        name: string;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updateLandTypeDto: UpdateLandTypeDto): import("@prisma/client").Prisma.Prisma__LandTypeClient<{
        id: string;
        name: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import("@prisma/client").Prisma.Prisma__LandTypeClient<{
        id: string;
        name: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
