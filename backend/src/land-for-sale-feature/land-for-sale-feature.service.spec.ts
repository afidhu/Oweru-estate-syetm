import { Test, TestingModule } from '@nestjs/testing';
import { LandForSaleFeatureService } from './land-for-sale-feature.service';

describe('LandForSaleFeatureService', () => {
  let service: LandForSaleFeatureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LandForSaleFeatureService],
    }).compile();

    service = module.get<LandForSaleFeatureService>(LandForSaleFeatureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
