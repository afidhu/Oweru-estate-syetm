import { Test, TestingModule } from '@nestjs/testing';
import { CommercialAreaController } from './commercial-area.controller';
import { CommercialAreaService } from './commercial-area.service';

describe('CommercialAreaController', () => {
  let controller: CommercialAreaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommercialAreaController],
      providers: [CommercialAreaService],
    }).compile();

    controller = module.get<CommercialAreaController>(CommercialAreaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
