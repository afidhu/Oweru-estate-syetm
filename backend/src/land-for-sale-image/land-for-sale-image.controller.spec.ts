import { Test, TestingModule } from '@nestjs/testing';
import { LandForSaleImageController } from './land-for-sale-image.controller';
import { LandForSaleImageService } from './land-for-sale-image.service';

describe('LandForSaleImageController', () => {
  let controller: LandForSaleImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LandForSaleImageController],
      providers: [LandForSaleImageService],
    }).compile();

    controller = module.get<LandForSaleImageController>(LandForSaleImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
