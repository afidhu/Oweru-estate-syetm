import { CreateWardDto } from './dto/create-ward.dto';
import { UpdateWardDto } from './dto/update-ward.dto';
import { PrismaService } from '../prisma.config/prisma.service';
export declare class WardsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createWardDto: CreateWardDto): import("@prisma/client").Prisma.Prisma__WardClient<{
        id: string;
        name: string;
        districtId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        districtId: string;
    }[]>;
    findOne(id: number): string;
    update(id: number, updateWardDto: UpdateWardDto): string;
    remove(id: number): string;
}
