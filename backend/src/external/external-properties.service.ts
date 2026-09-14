import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.config/prisma.service';

export type ListingType = 'houses' | 'lands' | 'commercial';

const DELEGATE_KEY: Record<ListingType, 'houseForSale' | 'landForSale' | 'commercialArea'> = {
  houses: 'houseForSale',
  lands: 'landForSale',
  commercial: 'commercialArea',
};

const NOT_DELETED = { status: { not: 'DELETED' } };

interface ListingDelegate {
  findMany(args: { where: typeof NOT_DELETED }): Promise<unknown[]>;
  update(args: { where: { id: string }; data: Record<string, unknown> }): Promise<unknown>;
}

@Injectable()
export class ExternalPropertiesService {
  constructor(private readonly prisma: PrismaService) {}

  /** A. Combined feed across all three tables, DELETED rows excluded. */
  async findAllCombined() {
    try {
      const [houses, lands, commercial] = await Promise.all([
        this.prisma.houseForSale.findMany({ where: NOT_DELETED }),
        this.prisma.landForSale.findMany({ where: NOT_DELETED }),
        this.prisma.commercialArea.findMany({ where: NOT_DELETED }),
      ]);

      return [
        ...houses.map((row) => ({ ...row, type: 'houses' as const })),
        ...lands.map((row) => ({ ...row, type: 'lands' as const })),
        ...commercial.map((row) => ({ ...row, type: 'commercial' as const })),
      ];
    } catch (error) {
      throw new BadRequestException('Unable to load the combined listing feed.');
    }
  }

  /** B. One table's active rows, selected by the :type discriminator. */
  async findByType(type: string) {
    const model = this.delegateFor(type);
    try {
      return await model.findMany({ where: NOT_DELETED });
    } catch (error) {
      throw new BadRequestException(`Unable to load "${type}" listings.`);
    }
  }

  /** C. Update one record in the table selected by :type. */
  async update(type: string, id: string, data: Record<string, unknown>) {
    const model = this.delegateFor(type);
    try {
      return await model.update({ where: { id }, data });
    } catch (error) {
      if (isRecordNotFound(error)) {
        throw new NotFoundException(`No "${type}" record found for id "${id}".`);
      }
      throw new BadRequestException('Unable to update the record.');
    }
  }

  /** D. Soft-delete: flips status to "DELETED" instead of removing the row. */
  async softDelete(type: string, id: string) {
    const model = this.delegateFor(type);
    try {
      return await model.update({ where: { id }, data: { status: 'DELETED' } });
    } catch (error) {
      if (isRecordNotFound(error)) {
        throw new NotFoundException(`No "${type}" record found for id "${id}".`);
      }
      throw new BadRequestException('Unable to delete the record.');
    }
  }

  private delegateFor(type: string): ListingDelegate {
    const key = DELEGATE_KEY[type as ListingType];
    if (!key) {
      throw new BadRequestException(`Unknown type "${type}". Use one of: houses, lands, commercial.`);
    }
    // Every value in DELEGATE_KEY names a real Prisma delegate on PrismaService.
    return (this.prisma as unknown as Record<string, ListingDelegate>)[key];
  }
}

function isRecordNotFound(error: unknown): boolean {
  return typeof error === 'object' && error !== null && (error as { code?: string }).code === 'P2025';
}
