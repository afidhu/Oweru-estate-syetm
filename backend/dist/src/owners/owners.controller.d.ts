import { OwnersService } from './owners.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
export declare class OwnersController {
    private readonly ownersService;
    constructor(ownersService: OwnersService);
    create(createOwnerDto: CreateOwnerDto): import("@prisma/client").Prisma.Prisma__OwnerClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        phone: string;
        nid: string | null;
        tin: string | null;
        email: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        phone: string;
        nid: string | null;
        tin: string | null;
        email: string | null;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__OwnerClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        phone: string;
        nid: string | null;
        tin: string | null;
        email: string | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateOwnerDto: UpdateOwnerDto): import("@prisma/client").Prisma.Prisma__OwnerClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        phone: string;
        nid: string | null;
        tin: string | null;
        email: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__OwnerClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        phone: string;
        nid: string | null;
        tin: string | null;
        email: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
