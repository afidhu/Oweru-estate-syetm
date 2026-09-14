import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { timingSafeEqual } from 'crypto';
import type { Request } from 'express';

/**
 * Bearer-token guard for the external B2B gateway (src/external/**).
 *
 * The caller must send `Authorization: Bearer <token>` where <token> matches
 * `process.env.EXTERNAL_SYSTEM_KEY` exactly. Comparison is constant-time to
 * avoid leaking the secret through response-timing side channels.
 */
@Injectable()
export class ExternalAuthGuard implements CanActivate {
  private readonly logger = new Logger(ExternalAuthGuard.name);

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const expected = process.env.EXTERNAL_SYSTEM_KEY;

    if (!expected) {
      // Fail closed: never treat a missing server-side secret as "allow all".
      this.logger.error('EXTERNAL_SYSTEM_KEY is not set — refusing all external requests.');
      throw new UnauthorizedException('External access is not configured.');
    }

    const token = extractBearerToken(request.headers['authorization']);
    if (!token || !safeEquals(token, expected)) {
      throw new UnauthorizedException('Invalid or missing bearer token.');
    }

    return true;
  }
}

function extractBearerToken(header: string | string[] | undefined): string | null {
  const value = Array.isArray(header) ? header[0] : header;
  if (!value) return null;
  const [scheme, token] = value.split(' ');
  if (!scheme || scheme.toLowerCase() !== 'bearer' || !token) return null;
  return token;
}

function safeEquals(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  // Different lengths never match; comparing equal-length buffers is what
  // makes timingSafeEqual meaningful, so we can't feed it mismatched sizes.
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}
