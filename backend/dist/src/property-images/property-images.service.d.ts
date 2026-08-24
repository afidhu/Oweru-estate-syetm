import { CreatePropertyImageDto } from './dto/create-property-image.dto';
import { UpdatePropertyImageDto } from './dto/update-property-image.dto';
import { PrismaService } from "../prisma.config/prisma.service";
export declare class PropertyImagesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    findOne(id: number): import("@prisma/client").Prisma.Prisma__PropertyImageClient<{
        url: string;
        id: string;
        createdAt: Date;
        propertyId: string;
        isCover: boolean;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updatePropertyImageDto: UpdatePropertyImageDto): import("@prisma/client").Prisma.Prisma__PropertyImageClient<{
        url: string;
        id: string;
        createdAt: Date;
        propertyId: string;
        isCover: boolean;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import("@prisma/client").Prisma.Prisma__PropertyImageClient<{
        url: string;
        id: string;
        createdAt: Date;
        propertyId: string;
        isCover: boolean;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
