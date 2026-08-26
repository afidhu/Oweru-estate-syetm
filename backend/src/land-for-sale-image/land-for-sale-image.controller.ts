import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LandForSaleImageService } from './land-for-sale-image.service';
import { CreateLandForSaleImageDto } from './dto/create-land-for-sale-image.dto';
import { UpdateLandForSaleImageDto } from './dto/update-land-for-sale-image.dto';

@Controller('land-for-sale-image')
export class LandForSaleImageController {
  constructor(private readonly landForSaleImageService: LandForSaleImageService) {}

  @Post()
  create(@Body() createLandForSaleImageDto: CreateLandForSaleImageDto) {
    return this.landForSaleImageService.create(createLandForSaleImageDto);
  }

  @Get()
  findAll() {
    return this.landForSaleImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.landForSaleImageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLandForSaleImageDto: UpdateLandForSaleImageDto) {
    return this.landForSaleImageService.update(+id, updateLandForSaleImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.landForSaleImageService.remove(+id);
  }
}
