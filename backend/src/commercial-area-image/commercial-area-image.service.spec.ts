import { Test, TestingModule } from '@nestjs/testing';
import { CommercialAreaImageService } from './commercial-area-image.service';

describe('CommercialAreaImageService', () => {
  let service: CommercialAreaImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommercialAreaImageService],
    }).compile();

    service = module.get<CommercialAreaImageService>(CommercialAreaImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
