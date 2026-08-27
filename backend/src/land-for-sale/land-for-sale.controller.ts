import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LandForSaleService } from './land-for-sale.service';
import { CreateLandForSaleDto } from './dto/create-land-for-sale.dto';
import { UpdateLandForSaleDto } from './dto/update-land-for-sale.dto';

@Controller('land-for-sale')
export class LandForSaleController {
  constructor(private readonly landForSaleService: LandForSaleService) {}

  @Post()
  create(@Body() createLandForSaleDto: CreateLandForSaleDto) {
    return this.landForSaleService.create(createLandForSaleDto);
  }

  @Get()
  findAll() {
    return this.landForSaleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.landForSaleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLandForSaleDto: UpdateLandForSaleDto) {
    return this.landForSaleService.update(id, updateLandForSaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.landForSaleService.remove(id);
  }
}
