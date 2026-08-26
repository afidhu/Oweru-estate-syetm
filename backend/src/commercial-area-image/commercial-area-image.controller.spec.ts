import { Test, TestingModule } from '@nestjs/testing';
import { CommercialAreaImageController } from './commercial-area-image.controller';
import { CommercialAreaImageService } from './commercial-area-image.service';

describe('CommercialAreaImageController', () => {
  let controller: CommercialAreaImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommercialAreaImageController],
      providers: [CommercialAreaImageService],
    }).compile();

    controller = module.get<CommercialAreaImageController>(CommercialAreaImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
