import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import { PrismaService } from "../prisma.config/prisma.service";
export declare class DealsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createDealDto: CreateDealDto): import("@prisma/client").Prisma.Prisma__DealClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        brokerId: string | null;
        propertyId: string;
        clientName: string;
        clientPhone: string | null;
        clientEmail: string | null;
        agreedPrice: import("@prisma/client-runtime-utils").Decimal | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        brokerId: string | null;
        propertyId: string;
        clientName: string;
        clientPhone: string | null;
        clientEmail: string | null;
        agreedPrice: import("@prisma/client-runtime-utils").Decimal | null;
    }[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__DealClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        brokerId: string | null;
        propertyId: string;
        clientName: string;
        clientPhone: string | null;
        clientEmail: string | null;
        agreedPrice: import("@prisma/client-runtime-utils").Decimal | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updateDealDto: UpdateDealDto): import("@prisma/client").Prisma.Prisma__DealClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        brokerId: string | null;
        propertyId: string;
        clientName: string;
        clientPhone: string | null;
        clientEmail: string | null;
        agreedPrice: import("@prisma/client-runtime-utils").Decimal | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import("@prisma/client").Prisma.Prisma__DealClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        brokerId: string | null;
        propertyId: string;
        clientName: string;
        clientPhone: string | null;
        clientEmail: string | null;
        agreedPrice: import("@prisma/client-runtime-utils").Decimal | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
