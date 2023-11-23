import {
  Controller,
  Get,
  Post,
  UseGuards,
  Delete,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { InfoService } from './info.service';
import { AuthGuard } from 'src/guards/auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { InfoTypes } from 'src/utlis/enum';
import { InfoDto } from './info.dto';
import { GetDto } from 'src/utlis/dto';

@ApiTags('Info')
@Controller('info')
export class InfoController {
  constructor(private service: InfoService) {}

  @Post()
  findAll(@Body() dto: GetDto) {
    return this.service.find(dto.limit, dto.page);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Post('/type/:type')
  @ApiParam({ name: 'type' })
  findType(@Param('type') type: InfoTypes, @Body() dto: GetDto) {
    return this.service.findType(type, dto.limit, dto.page);
  }
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Post('/create')
  create(@Body() dto: InfoDto) {
    return this.service.create(dto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Put(':id')
  @ApiParam({ name: 'id' })
  put(@Param('id') id: string, @Body() dto: InfoDto) {
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
  deleteMany() {
    return this.service.delete();
  }
}
