import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommercialAreaPropertyTypeService } from './commercial-area-property-type.service';
import { CreateCommercialAreaPropertyTypeDto } from './dto/create-commercial-area-property-type.dto';
import { UpdateCommercialAreaPropertyTypeDto } from './dto/update-commercial-area-property-type.dto';

@Controller('commercial-area-property-type')
export class CommercialAreaPropertyTypeController {
  constructor(private readonly commercialAreaPropertyTypeService: CommercialAreaPropertyTypeService) {}

  @Post()
  create(@Body() createCommercialAreaPropertyTypeDto: CreateCommercialAreaPropertyTypeDto) {
    return this.commercialAreaPropertyTypeService.create(createCommercialAreaPropertyTypeDto);
  }

  @Get()
  findAll() {
    return this.commercialAreaPropertyTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commercialAreaPropertyTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommercialAreaPropertyTypeDto: UpdateCommercialAreaPropertyTypeDto) {
    return this.commercialAreaPropertyTypeService.update(+id, updateCommercialAreaPropertyTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commercialAreaPropertyTypeService.remove(+id);
  }
}
