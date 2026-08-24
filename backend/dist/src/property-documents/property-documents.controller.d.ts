import { PropertyDocumentsService } from './property-documents.service';
import { CreatePropertyDocumentDto } from './dto/create-property-document.dto';
import { UpdatePropertyDocumentDto } from './dto/update-property-document.dto';
export declare class PropertyDocumentsController {
    private readonly propertyDocumentsService;
    constructor(propertyDocumentsService: PropertyDocumentsService);
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
    findOne(id: string): import("@prisma/client").Prisma.Prisma__PropertyDocumentClient<{
        url: string;
        id: string;
        createdAt: Date;
        name: string;
        propertyId: string;
        fileType: string | null;
        sizeBytes: number | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updatePropertyDocumentDto: UpdatePropertyDocumentDto): import("@prisma/client").Prisma.Prisma__PropertyDocumentClient<{
        url: string;
        id: string;
        createdAt: Date;
        name: string;
        propertyId: string;
        fileType: string | null;
        sizeBytes: number | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__PropertyDocumentClient<{
        url: string;
        id: string;
        createdAt: Date;
        name: string;
        propertyId: string;
        fileType: string | null;
        sizeBytes: number | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
