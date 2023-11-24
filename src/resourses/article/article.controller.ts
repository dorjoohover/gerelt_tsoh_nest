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
import { GetDto } from 'src/utlis/dto';
import { ArticleService } from './article.service';
import { ArticleTypes } from 'src/utlis/enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { ArticleDto } from './article.dto';

@Controller('article')
@ApiTags('Article')
export class ArticleController {
  constructor(private service: ArticleService) {}

  @Post()
  findAll(@Body() dto: GetDto) {
    return this.service.find(dto);
  }

  @Post('/type/:type')
  @ApiParam({ name: 'type' })
  findType(@Param('type') type: ArticleTypes, @Body() dto: GetDto) {
    return this.service.findType(type, dto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Post('/create')
  create(@Body() dto: ArticleDto) {
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
  put(@Param('id') id: string, dto: ArticleDto) {
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
