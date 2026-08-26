import { Test, TestingModule } from '@nestjs/testing';
import { HouseForSaleImageService } from './house-for-sale-image.service';

describe('HouseForSaleImageService', () => {
  let service: HouseForSaleImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HouseForSaleImageService],
    }).compile();

    service = module.get<HouseForSaleImageService>(HouseForSaleImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
