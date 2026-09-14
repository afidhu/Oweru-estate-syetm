import { IsNumber, IsOptional, IsString } from 'class-validator';

/**
 * PATCH body for the external gateway.
 *
 * IMPORTANT: the global ValidationPipe (see main.ts) runs with
 * `whitelist: true`, which silently drops any property that has no
 * class-validator decorator on this class — even if it's declared in
 * plain TypeScript. Every field a partner integration is allowed to send
 * MUST be decorated below, or NestJS strips it before it ever reaches
 * Prisma. (A previous version of this DTO had no decorators at all, which
 * is why PATCH requests were returning 200 but changing nothing.)
 *
 * Fields are optional and loosely typed on purpose: houses, lands, and
 * commercial areas each have a different column set, so this DTO only
 * covers what they share (plus the two commercial-only rent fields).
 * Sending a field a given type doesn't have (e.g. `monthlyRent` on a
 * house) still reaches Prisma, which rejects it with a clear runtime
 * error — caught by the service layer and turned into a 400.
 */
export class UpdateExternalListingDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsNumber()
  salePrice?: number;

  @IsOptional()
  @IsNumber()
  monthlyRent?: number;

  @IsOptional()
  @IsString()
  rentalTerm?: string;

  @IsOptional()
  @IsNumber()
  size?: number;

  @IsOptional()
  @IsString()
  sizeUnit?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
