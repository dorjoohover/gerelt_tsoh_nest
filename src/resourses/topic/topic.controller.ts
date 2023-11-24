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
import { TopicService } from './topic.service';
import { GetDto } from 'src/utlis/dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { TopicDto } from './topic.dto';
import { SymbolTypes } from 'src/utlis/enum';

@Controller('topic')
@ApiTags('Topic')
export class TopicController {
  constructor(private service: TopicService) {}

  @Post()
  findAll(@Body() dto: GetDto) {
    return this.service.find(dto);
  }

  @Post('/type/:type')
  @ApiParam({ name: 'type' })
  findType(@Param('type') type: SymbolTypes, @Body() dto: GetDto) {
    return this.service.findType(type, dto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Post('/create')
  create(@Body() dto: TopicDto) {
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
  put(@Param('id') id: string, dto: TopicDto) {
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
