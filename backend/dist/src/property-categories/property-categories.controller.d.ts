import { PropertyCategoriesService } from './property-categories.service';
import { CreatePropertyCategoryDto } from './dto/create-property-category.dto';
import { UpdatePropertyCategoryDto } from './dto/update-property-category.dto';
export declare class PropertyCategoriesController {
    private readonly propertyCategoriesService;
    constructor(propertyCategoriesService: PropertyCategoriesService);
    create(createPropertyCategoryDto: CreatePropertyCategoryDto): Promise<{
        id: string;
        title: string;
        slug: string;
        description: string | null;
        icon: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        title: string;
        slug: string;
        description: string | null;
        icon: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        title: string;
        slug: string;
        description: string | null;
        icon: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    update(id: string, updatePropertyCategoryDto: UpdatePropertyCategoryDto): Promise<{
        id: string;
        title: string;
        slug: string;
        description: string | null;
        icon: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        title: string;
        slug: string;
        description: string | null;
        icon: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
