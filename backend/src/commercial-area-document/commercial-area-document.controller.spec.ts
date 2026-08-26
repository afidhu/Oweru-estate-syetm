import { Test, TestingModule } from '@nestjs/testing';
import { CommercialAreaDocumentController } from './commercial-area-document.controller';
import { CommercialAreaDocumentService } from './commercial-area-document.service';

describe('CommercialAreaDocumentController', () => {
  let controller: CommercialAreaDocumentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommercialAreaDocumentController],
      providers: [CommercialAreaDocumentService],
    }).compile();

    controller = module.get<CommercialAreaDocumentController>(CommercialAreaDocumentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
