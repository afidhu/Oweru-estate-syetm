import { DistrictsService } from './districts.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
export declare class DistrictsController {
    private readonly districtsService;
    constructor(districtsService: DistrictsService);
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
    findOne(id: string): import("@prisma/client").Prisma.Prisma__DistrictClient<{
        id: string;
        name: string;
        regionId: string;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateDistrictDto: UpdateDistrictDto): import("@prisma/client").Prisma.Prisma__DistrictClient<{
        id: string;
        name: string;
        regionId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__DistrictClient<{
        id: string;
        name: string;
        regionId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
