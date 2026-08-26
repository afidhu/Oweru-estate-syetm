import { Test, TestingModule } from '@nestjs/testing';
import { CommercialAreaPropertyTypeService } from './commercial-area-property-type.service';

describe('CommercialAreaPropertyTypeService', () => {
  let service: CommercialAreaPropertyTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommercialAreaPropertyTypeService],
    }).compile();

    service = module.get<CommercialAreaPropertyTypeService>(CommercialAreaPropertyTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
