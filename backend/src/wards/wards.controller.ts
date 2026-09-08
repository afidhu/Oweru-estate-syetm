import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { WardsService } from './wards.service';
import { CreateWardDto } from './dto/create-ward.dto';
import { UpdateWardDto } from './dto/update-ward.dto';

@Controller('wards')
export class WardsController {
  constructor(private readonly wardsService: WardsService) {}

  @Post()
  create(@Body() createWardDto: CreateWardDto) {
    return this.wardsService.create(createWardDto);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey('wards')
  @CacheTTL(300)
  @Get()
  findAll() {
    return this.wardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wardsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWardDto: UpdateWardDto) {
    return this.wardsService.update(+id, updateWardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wardsService.remove(+id);
  }
}
