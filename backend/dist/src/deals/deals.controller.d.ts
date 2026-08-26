import { DealsService } from './deals.service';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
export declare class DealsController {
    private readonly dealsService;
    constructor(dealsService: DealsService);
    create(createDealDto: CreateDealDto): void;
    findAll(): void;
    findOne(id: string): void;
    update(id: string, updateDealDto: UpdateDealDto): void;
    remove(id: string): void;
}
