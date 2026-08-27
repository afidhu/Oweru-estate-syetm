import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommercialAreaService } from './commercial-area.service';
import { CreateCommercialAreaDto } from './dto/create-commercial-area.dto';
import { UpdateCommercialAreaDto } from './dto/update-commercial-area.dto';

@Controller('commercial-area')
export class CommercialAreaController {
  constructor(private readonly commercialAreaService: CommercialAreaService) {}

  @Post()
  create(@Body() createCommercialAreaDto: CreateCommercialAreaDto) {
    return this.commercialAreaService.create(createCommercialAreaDto);
  }

  @Get()
  findAll() {
    return this.commercialAreaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commercialAreaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommercialAreaDto: UpdateCommercialAreaDto) {
    return this.commercialAreaService.update(id, updateCommercialAreaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commercialAreaService.remove(id);
  }
}
