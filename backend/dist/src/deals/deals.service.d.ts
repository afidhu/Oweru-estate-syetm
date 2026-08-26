import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import { PrismaService } from "../prisma.config/prisma.service";
export declare class DealsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createDealDto: CreateDealDto): void;
    findAll(): void;
    findOne(id: number): void;
    update(id: number, updateDealDto: UpdateDealDto): void;
    remove(id: number): void;
}
