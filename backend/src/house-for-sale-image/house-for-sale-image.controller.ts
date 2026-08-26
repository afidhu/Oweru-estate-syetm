import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HouseForSaleImageService } from './house-for-sale-image.service';
import { CreateHouseForSaleImageDto } from './dto/create-house-for-sale-image.dto';
import { UpdateHouseForSaleImageDto } from './dto/update-house-for-sale-image.dto';

@Controller('house-for-sale-image')
export class HouseForSaleImageController {
  constructor(private readonly houseForSaleImageService: HouseForSaleImageService) {}

  @Post()
  create(@Body() createHouseForSaleImageDto: CreateHouseForSaleImageDto) {
    return this.houseForSaleImageService.create(createHouseForSaleImageDto);
  }

  @Get()
  findAll() {
    return this.houseForSaleImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.houseForSaleImageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHouseForSaleImageDto: UpdateHouseForSaleImageDto) {
    return this.houseForSaleImageService.update(+id, updateHouseForSaleImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.houseForSaleImageService.remove(+id);
  }
}
