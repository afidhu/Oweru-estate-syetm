import { Test, TestingModule } from '@nestjs/testing';
import { CommercialAreaDocumentService } from './commercial-area-document.service';

describe('CommercialAreaDocumentService', () => {
  let service: CommercialAreaDocumentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommercialAreaDocumentService],
    }).compile();

    service = module.get<CommercialAreaDocumentService>(CommercialAreaDocumentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
