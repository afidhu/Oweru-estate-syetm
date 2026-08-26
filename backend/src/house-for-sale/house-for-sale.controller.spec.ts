import { Test, TestingModule } from '@nestjs/testing';
import { HouseForSaleController } from './house-for-sale.controller';
import { HouseForSaleService } from './house-for-sale.service';

describe('HouseForSaleController', () => {
  let controller: HouseForSaleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HouseForSaleController],
      providers: [HouseForSaleService],
    }).compile();

    controller = module.get<HouseForSaleController>(HouseForSaleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
