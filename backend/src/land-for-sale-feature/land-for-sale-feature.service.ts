import { Injectable } from '@nestjs/common';
import { CreateLandForSaleFeatureDto } from './dto/create-land-for-sale-feature.dto';
import { UpdateLandForSaleFeatureDto } from './dto/update-land-for-sale-feature.dto';

@Injectable()
export class LandForSaleFeatureService {
  create(createLandForSaleFeatureDto: CreateLandForSaleFeatureDto) {
    return 'This action adds a new landForSaleFeature';
  }

  findAll() {
    return `This action returns all landForSaleFeature`;
  }

  findOne(id: number) {
    return `This action returns a #${id} landForSaleFeature`;
  }

  update(id: number, updateLandForSaleFeatureDto: UpdateLandForSaleFeatureDto) {
    return `This action updates a #${id} landForSaleFeature`;
  }

  remove(id: number) {
    return `This action removes a #${id} landForSaleFeature`;
  }
}
