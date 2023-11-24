import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(
    FileInterceptor('img', {
      dest: './uploads',
    }),
  )
  uploadSingle(@UploadedFile() file) {
    console.log(file);
    return file
  }
}
