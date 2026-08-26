import { Test, TestingModule } from '@nestjs/testing';
import { CommercialAreaPropertyTypeController } from './commercial-area-property-type.controller';
import { CommercialAreaPropertyTypeService } from './commercial-area-property-type.service';

describe('CommercialAreaPropertyTypeController', () => {
  let controller: CommercialAreaPropertyTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommercialAreaPropertyTypeController],
      providers: [CommercialAreaPropertyTypeService],
    }).compile();

    controller = module.get<CommercialAreaPropertyTypeController>(CommercialAreaPropertyTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
