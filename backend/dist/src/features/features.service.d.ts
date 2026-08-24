import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { PrismaService } from "../prisma.config/prisma.service";
export declare class FeaturesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createFeatureDto: CreateFeatureDto): import("@prisma/client").Prisma.Prisma__FeatureClient<{
        id: string;
        name: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
    }[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__FeatureClient<{
        id: string;
        name: string;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updateFeatureDto: UpdateFeatureDto): import("@prisma/client").Prisma.Prisma__FeatureClient<{
        id: string;
        name: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import("@prisma/client").Prisma.Prisma__FeatureClient<{
        id: string;
        name: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
