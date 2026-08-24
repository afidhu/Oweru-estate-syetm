import { DealsService } from './deals.service';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
export declare class DealsController {
    private readonly dealsService;
    constructor(dealsService: DealsService);
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
    findOne(id: string): import("@prisma/client").Prisma.Prisma__DealClient<{
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
    update(id: string, updateDealDto: UpdateDealDto): import("@prisma/client").Prisma.Prisma__DealClient<{
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
    remove(id: string): import("@prisma/client").Prisma.Prisma__DealClient<{
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
