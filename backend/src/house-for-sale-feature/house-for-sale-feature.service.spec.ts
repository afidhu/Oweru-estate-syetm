import { Test, TestingModule } from '@nestjs/testing';
import { HouseForSaleFeatureService } from './house-for-sale-feature.service';

describe('HouseForSaleFeatureService', () => {
  let service: HouseForSaleFeatureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HouseForSaleFeatureService],
    }).compile();

    service = module.get<HouseForSaleFeatureService>(HouseForSaleFeatureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
