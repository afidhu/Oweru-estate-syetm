import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HouseForSaleFeatureService } from './house-for-sale-feature.service';
import { CreateHouseForSaleFeatureDto } from './dto/create-house-for-sale-feature.dto';
import { UpdateHouseForSaleFeatureDto } from './dto/update-house-for-sale-feature.dto';

@Controller('house-for-sale-feature')
export class HouseForSaleFeatureController {
  constructor(private readonly houseForSaleFeatureService: HouseForSaleFeatureService) {}

  @Post()
  create(@Body() createHouseForSaleFeatureDto: CreateHouseForSaleFeatureDto) {
    return this.houseForSaleFeatureService.create(createHouseForSaleFeatureDto);
  }

  @Get()
  findAll() {
    return this.houseForSaleFeatureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.houseForSaleFeatureService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHouseForSaleFeatureDto: UpdateHouseForSaleFeatureDto) {
    return this.houseForSaleFeatureService.update(+id, updateHouseForSaleFeatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.houseForSaleFeatureService.remove(+id);
  }
}
