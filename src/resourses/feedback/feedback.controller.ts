import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  Delete,
  UseGuards,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { FeedbackService } from './feedback.service';

import { AuthGuard } from 'src/guards/auth.guard';
import { FeedBackDetailDto } from './feedback.dto';
import { GetDto } from 'src/utlis/dto';
import * as nodemailer from 'nodemailer';

import { MailerService } from '@nestjs-modules/mailer';
@Controller('feedback')
@ApiTags('Feedback')
export class FeedbackController {
  constructor(private service: FeedbackService) {}
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Post()
  findAll(@Body() dto: GetDto) {
    return this.service.find(dto);
  }
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Post('/date')
  findType(@Body() dto: GetDto) {
    return this.service.findByDate(dto);
  }

  @Post('/create')
  async create(@Body() dto: FeedBackDetailDto[]) {
    // this.send();
    return this.service.create(dto);
  }
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiParam({ name: 'id' })
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }
  //   @ApiBearerAuth('access-token')
  //   @UseGuards(AuthGuard)
  //   @Put(':id')
  //   @ApiParam({ name: 'id' })
  //   put(@Param('id') id: string, dto: FeedBackDetailDto[]) {
  //     return this.service.put(id, dto);
  //   }
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiParam({ name: 'id' })
  deleteById(@Param('id') id: string) {
    return this.service.deleteById(id);
  }
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Delete()
  delete() {
    return this.service.delete();
  }
}
