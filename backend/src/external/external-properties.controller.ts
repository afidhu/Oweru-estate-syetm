import { Body, Controller, Delete, Get, Param, Patch, UseGuards, ValidationPipe } from '@nestjs/common';
import { ExternalAuthGuard } from './external-auth.guard';
import { ExternalPropertiesService } from './external-properties.service';
import { UpdateExternalListingDto } from './dto/update-external-listing.dto';

/**
 * External B2B gateway. Every route requires a valid
 * `Authorization: Bearer <EXTERNAL_SYSTEM_KEY>` header (see ExternalAuthGuard)
 * so partner systems never touch raw database credentials.
 *
 * Mounted at /external/properties — kept separate from the existing
 * /properties endpoint (which serves the internal Property mirror table in a
 * different shape) to avoid a silent route collision.
 */
@Controller('external/properties')
@UseGuards(ExternalAuthGuard)
export class ExternalPropertiesController {
  constructor(private readonly externalPropertiesService: ExternalPropertiesService) {}

  // A. GET /external/properties — combined feed, all types, DELETED excluded.
  @Get()
  findAll() {
    return this.externalPropertiesService.findAllCombined();
  }

  // B. GET /external/properties/:type — one type's active rows.
  @Get(':type')
  findByType(@Param('type') type: string) {
    return this.externalPropertiesService.findByType(type);
  }

  // C. PATCH /external/properties/:type/:id — update one record.
  // The body is intentionally loosely validated: each listing type has a
  // different column set (see UpdateExternalListingDto), so the global
  // ValidationPipe's `whitelist: true` is disabled just for this parameter
  // instead of stripping fields it doesn't recognize.
  @Patch(':type/:id')
  update(
    @Param('type') type: string,
    @Param('id') id: string,
    @Body(new ValidationPipe({ whitelist: false, transform: true })) body: UpdateExternalListingDto,
  ) {
    return this.externalPropertiesService.update(type, id, body);
  }

  // D. DELETE /external/properties/:type/:id — soft-delete (status -> DELETED).
  @Delete(':type/:id')
  softDelete(@Param('type') type: string, @Param('id') id: string) {
    return this.externalPropertiesService.softDelete(type, id);
  }
}
