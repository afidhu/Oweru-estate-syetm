import { CreateCommissionDto } from './dto/create-commission.dto';
import { UpdateCommissionDto } from './dto/update-commission.dto';
import { PrismaService } from "../prisma.config/prisma.service";
export declare class CommissionsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    findOne(id: number): import("@prisma/client").Prisma.Prisma__CommissionClient<{
        id: string;
        createdAt: Date;
        brokerId: string;
        dealId: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        percentage: import("@prisma/client-runtime-utils").Decimal | null;
        paid: boolean;
        paidAt: Date | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updateCommissionDto: UpdateCommissionDto): import("@prisma/client").Prisma.Prisma__CommissionClient<{
        id: string;
        createdAt: Date;
        brokerId: string;
        dealId: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        percentage: import("@prisma/client-runtime-utils").Decimal | null;
        paid: boolean;
        paidAt: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import("@prisma/client").Prisma.Prisma__CommissionClient<{
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
