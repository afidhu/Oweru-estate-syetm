import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LandForSaleFeatureService } from './land-for-sale-feature.service';
import { CreateLandForSaleFeatureDto } from './dto/create-land-for-sale-feature.dto';
import { UpdateLandForSaleFeatureDto } from './dto/update-land-for-sale-feature.dto';

@Controller('land-for-sale-feature')
export class LandForSaleFeatureController {
  constructor(private readonly landForSaleFeatureService: LandForSaleFeatureService) {}

  @Post()
  create(@Body() createLandForSaleFeatureDto: CreateLandForSaleFeatureDto) {
    return this.landForSaleFeatureService.create(createLandForSaleFeatureDto);
  }

  @Get()
  findAll() {
    return this.landForSaleFeatureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.landForSaleFeatureService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLandForSaleFeatureDto: UpdateLandForSaleFeatureDto) {
    return this.landForSaleFeatureService.update(+id, updateLandForSaleFeatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.landForSaleFeatureService.remove(+id);
  }
}
