import { PrismaService } from '../prisma.config/prisma.service';
import { CreatePropertyCategoryDto } from './dto/create-property-category.dto';
import { UpdatePropertyCategoryDto } from './dto/update-property-category.dto';
export declare class PropertyCategoriesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createPropertyCategoryDto: CreatePropertyCategoryDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        slug: string;
        description: string | null;
        icon: string | null;
        accent: string | null;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        slug: string;
        description: string | null;
        icon: string | null;
        accent: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        slug: string;
        description: string | null;
        icon: string | null;
        accent: string | null;
    } | null>;
    update(id: string, updatePropertyCategoryDto: UpdatePropertyCategoryDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        slug: string;
        description: string | null;
        icon: string | null;
        accent: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        slug: string;
        description: string | null;
        icon: string | null;
        accent: string | null;
    }>;
}
