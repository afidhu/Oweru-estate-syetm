import { Test, TestingModule } from '@nestjs/testing';
import { HouseForSaleImageController } from './house-for-sale-image.controller';
import { HouseForSaleImageService } from './house-for-sale-image.service';

describe('HouseForSaleImageController', () => {
  let controller: HouseForSaleImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HouseForSaleImageController],
      providers: [HouseForSaleImageService],
    }).compile();

    controller = module.get<HouseForSaleImageController>(HouseForSaleImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
