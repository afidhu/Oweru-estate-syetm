import { CommissionsService } from './commissions.service';
import { CreateCommissionDto } from './dto/create-commission.dto';
import { UpdateCommissionDto } from './dto/update-commission.dto';
export declare class CommissionsController {
    private readonly commissionsService;
    constructor(commissionsService: CommissionsService);
    create(createCommissionDto: CreateCommissionDto): void;
    findAll(): void;
    findOne(id: string): void;
    update(id: string, updateCommissionDto: UpdateCommissionDto): void;
    remove(id: string): void;
}
