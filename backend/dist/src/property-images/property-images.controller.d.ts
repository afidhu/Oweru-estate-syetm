import { PropertyImagesService } from './property-images.service';
import { CreatePropertyImageDto } from './dto/create-property-image.dto';
import { UpdatePropertyImageDto } from './dto/update-property-image.dto';
export declare class PropertyImagesController {
    private readonly propertyImagesService;
    constructor(propertyImagesService: PropertyImagesService);
    create(createPropertyImageDto: CreatePropertyImageDto): import("@prisma/client").Prisma.Prisma__PropertyImageClient<{
        url: string;
        id: string;
        createdAt: Date;
        propertyId: string;
        isCover: boolean;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        url: string;
        id: string;
        createdAt: Date;
        propertyId: string;
        isCover: boolean;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__PropertyImageClient<{
        url: string;
        id: string;
        createdAt: Date;
        propertyId: string;
        isCover: boolean;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updatePropertyImageDto: UpdatePropertyImageDto): import("@prisma/client").Prisma.Prisma__PropertyImageClient<{
        url: string;
        id: string;
        createdAt: Date;
        propertyId: string;
        isCover: boolean;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__PropertyImageClient<{
        url: string;
        id: string;
        createdAt: Date;
        propertyId: string;
        isCover: boolean;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
