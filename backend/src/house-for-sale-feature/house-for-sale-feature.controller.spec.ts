import { Test, TestingModule } from '@nestjs/testing';
import { HouseForSaleFeatureController } from './house-for-sale-feature.controller';
import { HouseForSaleFeatureService } from './house-for-sale-feature.service';

describe('HouseForSaleFeatureController', () => {
  let controller: HouseForSaleFeatureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HouseForSaleFeatureController],
      providers: [HouseForSaleFeatureService],
    }).compile();

    controller = module.get<HouseForSaleFeatureController>(HouseForSaleFeatureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
