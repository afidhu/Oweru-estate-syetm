import { Test, TestingModule } from '@nestjs/testing';
import { LandForSaleFeatureController } from './land-for-sale-feature.controller';
import { LandForSaleFeatureService } from './land-for-sale-feature.service';

describe('LandForSaleFeatureController', () => {
  let controller: LandForSaleFeatureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LandForSaleFeatureController],
      providers: [LandForSaleFeatureService],
    }).compile();

    controller = module.get<LandForSaleFeatureController>(LandForSaleFeatureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
