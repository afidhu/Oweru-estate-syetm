import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommercialAreaDocumentService } from './commercial-area-document.service';
import { CreateCommercialAreaDocumentDto } from './dto/create-commercial-area-document.dto';
import { UpdateCommercialAreaDocumentDto } from './dto/update-commercial-area-document.dto';

@Controller('commercial-area-document')
export class CommercialAreaDocumentController {
  constructor(private readonly commercialAreaDocumentService: CommercialAreaDocumentService) {}

  @Post()
  create(@Body() createCommercialAreaDocumentDto: CreateCommercialAreaDocumentDto) {
    return this.commercialAreaDocumentService.create(createCommercialAreaDocumentDto);
  }

  @Get()
  findAll() {
    return this.commercialAreaDocumentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commercialAreaDocumentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommercialAreaDocumentDto: UpdateCommercialAreaDocumentDto) {
    return this.commercialAreaDocumentService.update(+id, updateCommercialAreaDocumentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commercialAreaDocumentService.remove(+id);
  }
}
