import { Test, TestingModule } from '@nestjs/testing';
import { LandForSaleImageService } from './land-for-sale-image.service';

describe('LandForSaleImageService', () => {
  let service: LandForSaleImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LandForSaleImageService],
    }).compile();

    service = module.get<LandForSaleImageService>(LandForSaleImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
