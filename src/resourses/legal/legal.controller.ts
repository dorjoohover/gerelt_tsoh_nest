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
import { LegalService } from './legal.service';

import { LegalTypes } from 'src/utlis/enum';
import { LegalDto } from './legal.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { GetDto } from 'src/utlis/dto';

@Controller('legal')
@ApiTags('Legal')
export class LegalController {
  constructor(private service: LegalService) {}

  @Post()
  findAll(@Body() dto: GetDto) {
    return this.service.find(dto);
  }

  @Post('/type/:type')
  @ApiParam({ name: 'type' })
  findType(@Param('type') type: LegalTypes, @Body() dto: GetDto) {
    return this.service.findType(type, dto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Post('/create')
  create(@Body() dto: LegalDto) {
    return this.service.create(dto);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Put(':id')
  @ApiParam({ name: 'id' })
  put(@Param('id') id: string, dto: LegalDto) {
    return this.service.put(id, dto);
  }
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
