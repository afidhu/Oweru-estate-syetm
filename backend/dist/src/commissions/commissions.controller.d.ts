import { CommissionsService } from './commissions.service';
import { CreateCommissionDto } from './dto/create-commission.dto';
import { UpdateCommissionDto } from './dto/update-commission.dto';
export declare class CommissionsController {
    private readonly commissionsService;
    constructor(commissionsService: CommissionsService);
    create(createCommissionDto: CreateCommissionDto): import("@prisma/client").Prisma.Prisma__CommissionClient<{
        id: string;
        createdAt: Date;
        brokerId: string;
        dealId: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        percentage: import("@prisma/client-runtime-utils").Decimal | null;
        paid: boolean;
        paidAt: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        brokerId: string;
        dealId: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        percentage: import("@prisma/client-runtime-utils").Decimal | null;
        paid: boolean;
        paidAt: Date | null;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__CommissionClient<{
        id: string;
        createdAt: Date;
        brokerId: string;
        dealId: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        percentage: import("@prisma/client-runtime-utils").Decimal | null;
        paid: boolean;
        paidAt: Date | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateCommissionDto: UpdateCommissionDto): import("@prisma/client").Prisma.Prisma__CommissionClient<{
        id: string;
        createdAt: Date;
        brokerId: string;
        dealId: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        percentage: import("@prisma/client-runtime-utils").Decimal | null;
        paid: boolean;
        paidAt: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__CommissionClient<{
        id: string;
        createdAt: Date;
        brokerId: string;
        dealId: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        percentage: import("@prisma/client-runtime-utils").Decimal | null;
        paid: boolean;
        paidAt: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
