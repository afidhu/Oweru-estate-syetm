import { Test, TestingModule } from '@nestjs/testing';
import { HouseForSaleDocumentService } from './house-for-sale-document.service';

describe('HouseForSaleDocumentService', () => {
  let service: HouseForSaleDocumentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HouseForSaleDocumentService],
    }).compile();

    service = module.get<HouseForSaleDocumentService>(HouseForSaleDocumentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
