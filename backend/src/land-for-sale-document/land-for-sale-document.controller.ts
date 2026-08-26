import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LandForSaleDocumentService } from './land-for-sale-document.service';
import { CreateLandForSaleDocumentDto } from './dto/create-land-for-sale-document.dto';
import { UpdateLandForSaleDocumentDto } from './dto/update-land-for-sale-document.dto';

@Controller('land-for-sale-document')
export class LandForSaleDocumentController {
  constructor(private readonly landForSaleDocumentService: LandForSaleDocumentService) {}

  @Post()
  create(@Body() createLandForSaleDocumentDto: CreateLandForSaleDocumentDto) {
    return this.landForSaleDocumentService.create(createLandForSaleDocumentDto);
  }

  @Get()
  findAll() {
    return this.landForSaleDocumentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.landForSaleDocumentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLandForSaleDocumentDto: UpdateLandForSaleDocumentDto) {
    return this.landForSaleDocumentService.update(+id, updateLandForSaleDocumentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.landForSaleDocumentService.remove(+id);
  }
}
