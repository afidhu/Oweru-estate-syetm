import { Test, TestingModule } from '@nestjs/testing';
import { LandForSaleDocumentService } from './land-for-sale-document.service';

describe('LandForSaleDocumentService', () => {
  let service: LandForSaleDocumentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LandForSaleDocumentService],
    }).compile();

    service = module.get<LandForSaleDocumentService>(LandForSaleDocumentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
