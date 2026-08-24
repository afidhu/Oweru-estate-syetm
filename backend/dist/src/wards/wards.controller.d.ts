import { WardsService } from './wards.service';
import { CreateWardDto } from './dto/create-ward.dto';
import { UpdateWardDto } from './dto/update-ward.dto';
export declare class WardsController {
    private readonly wardsService;
    constructor(wardsService: WardsService);
    create(createWardDto: CreateWardDto): import("@prisma/client").Prisma.Prisma__WardClient<{
        id: string;
        name: string;
        districtId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateWardDto: UpdateWardDto): string;
    remove(id: string): string;
}
