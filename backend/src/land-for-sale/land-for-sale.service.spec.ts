import { Test, TestingModule } from '@nestjs/testing';
import { LandForSaleService } from './land-for-sale.service';

describe('LandForSaleService', () => {
  let service: LandForSaleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LandForSaleService],
    }).compile();

    service = module.get<LandForSaleService>(LandForSaleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
