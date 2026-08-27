import {
  BadRequestException,
  Controller,
  HttpCode,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { randomUUID } from 'crypto';
import { mkdirSync } from 'fs';

const uploadDirectory = join(process.cwd(), 'uploads');
mkdirSync(uploadDirectory, { recursive: true });

@Controller('uploads')
export class UploadsController {
  @Post()
  @HttpCode(201)
  @UseInterceptors(FilesInterceptor('files', 20, {
    storage: diskStorage({
      destination: uploadDirectory,
      filename: (_request, file, callback) => {
        callback(null, `${randomUUID()}${extname(file.originalname).toLowerCase()}`);
      },
    }),
    limits: { fileSize: 25 * 1024 * 1024 },
    fileFilter: (_request, file, callback) => {
      const accepted = file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf';
      callback(accepted ? null : new BadRequestException('Only images and PDF documents are allowed.'), accepted);
    },
  }))
  upload(@UploadedFiles() files: Array<{ filename: string; originalname: string; mimetype: string; size: number }> = []) {
    return {
      files: files.map((file) => ({
        name: file.originalname,
        url: `/uploads/${file.filename}`,
        fileType: file.mimetype,
        sizeBytes: file.size,
      })),
    };
  }
}