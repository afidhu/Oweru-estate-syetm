import { CreateCommissionDto } from './dto/create-commission.dto';
import { UpdateCommissionDto } from './dto/update-commission.dto';
import { PrismaService } from "../prisma.config/prisma.service";
export declare class CommissionsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createCommissionDto: CreateCommissionDto): void;
    findAll(): void;
    findOne(id: number): void;
    update(id: number, updateCommissionDto: UpdateCommissionDto): void;
    remove(id: number): void;
}
