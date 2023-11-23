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
import { ContactService } from './contact.service';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from 'src/guards/auth.guard';
import { ContactDto } from './contact.dto';
import { GetDto } from 'src/utlis/dto';

@Controller('contact')
@ApiTags('Contact')
export class ContactController {
  constructor(private service: ContactService) {}
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
  create(@Body() dto: ContactDto) {
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
  //   put(@Param('id') id: string, dto: ContactDto) {
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
