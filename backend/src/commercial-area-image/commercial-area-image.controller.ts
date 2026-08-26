import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommercialAreaImageService } from './commercial-area-image.service';
import { CreateCommercialAreaImageDto } from './dto/create-commercial-area-image.dto';
import { UpdateCommercialAreaImageDto } from './dto/update-commercial-area-image.dto';

@Controller('commercial-area-image')
export class CommercialAreaImageController {
  constructor(private readonly commercialAreaImageService: CommercialAreaImageService) {}

  @Post()
  create(@Body() createCommercialAreaImageDto: CreateCommercialAreaImageDto) {
    return this.commercialAreaImageService.create(createCommercialAreaImageDto);
  }

  @Get()
  findAll() {
    return this.commercialAreaImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commercialAreaImageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommercialAreaImageDto: UpdateCommercialAreaImageDto) {
    return this.commercialAreaImageService.update(+id, updateCommercialAreaImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commercialAreaImageService.remove(+id);
  }
}
