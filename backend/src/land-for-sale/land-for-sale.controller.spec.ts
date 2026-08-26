import { Test, TestingModule } from '@nestjs/testing';
import { LandForSaleController } from './land-for-sale.controller';
import { LandForSaleService } from './land-for-sale.service';

describe('LandForSaleController', () => {
  let controller: LandForSaleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LandForSaleController],
      providers: [LandForSaleService],
    }).compile();

    controller = module.get<LandForSaleController>(LandForSaleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
