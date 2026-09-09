import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

/**
 * Catches everything that is not already an HttpException (most importantly
 * Prisma / database errors) and returns a readable message instead of a bare
 * "Internal server error", so the client can show what actually went wrong.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('Exceptions');

  catch(exception: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      response.status(status).json(exception.getResponse());
      return;
    }

    const error = exception as { message?: string; code?: string; meta?: unknown };
    this.logger.error(error?.message ?? 'Unknown error', (exception as Error)?.stack);

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: error?.message
        ? `${error.code ? `[${error.code}] ` : ''}${error.message}`
        : 'Internal server error',
    });
  }
}
