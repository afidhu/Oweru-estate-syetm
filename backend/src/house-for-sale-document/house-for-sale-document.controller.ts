import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HouseForSaleDocumentService } from './house-for-sale-document.service';
import { CreateHouseForSaleDocumentDto } from './dto/create-house-for-sale-document.dto';
import { UpdateHouseForSaleDocumentDto } from './dto/update-house-for-sale-document.dto';

@Controller('house-for-sale-document')
export class HouseForSaleDocumentController {
  constructor(private readonly houseForSaleDocumentService: HouseForSaleDocumentService) {}

  @Post()
  create(@Body() createHouseForSaleDocumentDto: CreateHouseForSaleDocumentDto) {
    return this.houseForSaleDocumentService.create(createHouseForSaleDocumentDto);
  }

  @Get()
  findAll() {
    return this.houseForSaleDocumentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.houseForSaleDocumentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHouseForSaleDocumentDto: UpdateHouseForSaleDocumentDto) {
    return this.houseForSaleDocumentService.update(+id, updateHouseForSaleDocumentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.houseForSaleDocumentService.remove(+id);
  }
}
