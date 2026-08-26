import { Test, TestingModule } from '@nestjs/testing';
import { LandForSaleDocumentController } from './land-for-sale-document.controller';
import { LandForSaleDocumentService } from './land-for-sale-document.service';

describe('LandForSaleDocumentController', () => {
  let controller: LandForSaleDocumentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LandForSaleDocumentController],
      providers: [LandForSaleDocumentService],
    }).compile();

    controller = module.get<LandForSaleDocumentController>(LandForSaleDocumentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
