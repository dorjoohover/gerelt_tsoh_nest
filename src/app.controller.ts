import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { createReadStream } from 'fs';
import { ApiParam } from '@nestjs/swagger';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename(req, file, callback) {
          callback(null, `${Date.now()}${file.originalname}`);
        },
      }),
    }),
  )
  async uploadSingle(@UploadedFile() file) {
    return {
      file: file.filename,
    };
  }

  @Get(':file')
  @ApiParam({ name: 'file' })
  getFile(@Param('file') filename: string): StreamableFile {
    const file = createReadStream(
      path.join(__dirname, '../uploads/' + filename),
    );
    return new StreamableFile(file);
  }
}
