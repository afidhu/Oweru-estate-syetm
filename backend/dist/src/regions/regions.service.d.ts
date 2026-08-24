import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from "../prisma.config/prisma.service";
export declare class RegionsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createRegionDto: CreateRegionDto): import("@prisma/client").Prisma.Prisma__RegionClient<{
        id: string;
        name: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
    }[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__RegionClient<{
        id: string;
        name: string;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updateRegionDto: UpdateRegionDto): import("@prisma/client").Prisma.Prisma__RegionClient<{
        id: string;
        name: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): string;
}
