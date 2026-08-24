import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropertyDocumentsService } from './property-documents.service';
import { CreatePropertyDocumentDto } from './dto/create-property-document.dto';
import { UpdatePropertyDocumentDto } from './dto/update-property-document.dto';

@Controller('property-documents')
export class PropertyDocumentsController {
  constructor(private readonly propertyDocumentsService: PropertyDocumentsService) {}

  @Post()
  create(@Body() createPropertyDocumentDto: CreatePropertyDocumentDto) {
    return this.propertyDocumentsService.create(createPropertyDocumentDto);
  }

  @Get()
  findAll() {
    return this.propertyDocumentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyDocumentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertyDocumentDto: UpdatePropertyDocumentDto) {
    return this.propertyDocumentsService.update(+id, updatePropertyDocumentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertyDocumentsService.remove(+id);
  }
}
