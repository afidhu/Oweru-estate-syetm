import { PropertyFeaturesService } from './property-features.service';
import { CreatePropertyFeatureDto } from './dto/create-property-feature.dto';
import { UpdatePropertyFeatureDto } from './dto/update-property-feature.dto';
export declare class PropertyFeaturesController {
    private readonly propertyFeaturesService;
    constructor(propertyFeaturesService: PropertyFeaturesService);
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
    findOne(id: string): import("@prisma/client").Prisma.Prisma__PropertyFeatureClient<{
        id: string;
        propertyId: string;
        featureId: string;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updatePropertyFeatureDto: UpdatePropertyFeatureDto): import("@prisma/client").Prisma.Prisma__PropertyFeatureClient<{
        id: string;
        propertyId: string;
        featureId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__PropertyFeatureClient<{
        id: string;
        propertyId: string;
        featureId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
