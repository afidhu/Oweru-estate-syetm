import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { HouseForSaleService } from './house-for-sale.service';
import { CreateHouseForSaleDto } from './dto/create-house-for-sale.dto';
import { UpdateHouseForSaleDto } from './dto/update-house-for-sale.dto';

@Controller('house-for-sale')
export class HouseForSaleController {
  constructor(private readonly houseForSaleService: HouseForSaleService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() createHouseForSaleDto: CreateHouseForSaleDto) {
    return this.houseForSaleService.create(createHouseForSaleDto);
  }

  @Get()
  findAll() {
    return this.houseForSaleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.houseForSaleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHouseForSaleDto: UpdateHouseForSaleDto) {
    return this.houseForSaleService.update(id, updateHouseForSaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.houseForSaleService.remove(id);
  }
}
