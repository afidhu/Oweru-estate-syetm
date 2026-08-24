import { CreatePropertyDocumentDto } from './dto/create-property-document.dto';
import { UpdatePropertyDocumentDto } from './dto/update-property-document.dto';
import { PrismaService } from "../prisma.config/prisma.service";
export declare class PropertyDocumentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createPropertyDocumentDto: CreatePropertyDocumentDto): import("@prisma/client").Prisma.Prisma__PropertyDocumentClient<{
        url: string;
        id: string;
        createdAt: Date;
        name: string;
        propertyId: string;
        fileType: string | null;
        sizeBytes: number | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        url: string;
        id: string;
        createdAt: Date;
        name: string;
        propertyId: string;
        fileType: string | null;
        sizeBytes: number | null;
    }[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__PropertyDocumentClient<{
        url: string;
        id: string;
        createdAt: Date;
        name: string;
        propertyId: string;
        fileType: string | null;
        sizeBytes: number | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updatePropertyDocumentDto: UpdatePropertyDocumentDto): import("@prisma/client").Prisma.Prisma__PropertyDocumentClient<{
        url: string;
        id: string;
        createdAt: Date;
        name: string;
        propertyId: string;
        fileType: string | null;
        sizeBytes: number | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import("@prisma/client").Prisma.Prisma__PropertyDocumentClient<{
        url: string;
        id: string;
        createdAt: Date;
        name: string;
        propertyId: string;
        fileType: string | null;
        sizeBytes: number | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
