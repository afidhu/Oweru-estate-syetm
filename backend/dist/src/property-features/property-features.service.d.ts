import { CreatePropertyFeatureDto } from './dto/create-property-feature.dto';
import { UpdatePropertyFeatureDto } from './dto/update-property-feature.dto';
import { PrismaService } from "../prisma.config/prisma.service";
export declare class PropertyFeaturesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createPropertyFeatureDto: CreatePropertyFeatureDto): import("@prisma/client").Prisma.Prisma__PropertyFeatureClient<{
        id: string;
        propertyId: string;
        featureId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        propertyId: string;
        featureId: string;
    }[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__PropertyFeatureClient<{
        id: string;
        propertyId: string;
        featureId: string;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updatePropertyFeatureDto: UpdatePropertyFeatureDto): import("@prisma/client").Prisma.Prisma__PropertyFeatureClient<{
        id: string;
        propertyId: string;
        featureId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import("@prisma/client").Prisma.Prisma__PropertyFeatureClient<{
        id: string;
        propertyId: string;
        featureId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
