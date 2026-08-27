import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { PrismaService } from '../prisma.config/prisma.service';
export declare class DistrictsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createDistrictDto: CreateDistrictDto): import("@prisma/client").Prisma.Prisma__DistrictClient<{
        id: string;
        name: string;
        regionId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        regionId: string;
    }[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__DistrictClient<{
        id: string;
        name: string;
        regionId: string;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updateDistrictDto: UpdateDistrictDto): import("@prisma/client").Prisma.Prisma__DistrictClient<{
        id: string;
        name: string;
        regionId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import("@prisma/client").Prisma.Prisma__DistrictClient<{
        id: string;
        name: string;
        regionId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
