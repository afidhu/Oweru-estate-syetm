import {
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
    limits: { fileSize: 30 * 1024 * 1024 },
    fileFilter: (_request, _file, callback) => {
      callback(null, true);
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