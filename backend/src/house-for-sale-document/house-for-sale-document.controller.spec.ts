import { Test, TestingModule } from '@nestjs/testing';
import { HouseForSaleDocumentController } from './house-for-sale-document.controller';
import { HouseForSaleDocumentService } from './house-for-sale-document.service';

describe('HouseForSaleDocumentController', () => {
  let controller: HouseForSaleDocumentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HouseForSaleDocumentController],
      providers: [HouseForSaleDocumentService],
    }).compile();

    controller = module.get<HouseForSaleDocumentController>(HouseForSaleDocumentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
