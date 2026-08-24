import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LandTypesService } from './land-types.service';
import { CreateLandTypeDto } from './dto/create-land-type.dto';
import { UpdateLandTypeDto } from './dto/update-land-type.dto';

@Controller('land-types')
export class LandTypesController {
  constructor(private readonly landTypesService: LandTypesService) {}

  @Post()
  create(@Body() createLandTypeDto: CreateLandTypeDto) {
    return this.landTypesService.create(createLandTypeDto);
  }

  @Get()
  findAll() {
    return this.landTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.landTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLandTypeDto: UpdateLandTypeDto) {
    return this.landTypesService.update(+id, updateLandTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.landTypesService.remove(+id);
  }
}
