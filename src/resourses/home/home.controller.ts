import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiTags } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { Home, HomeDocument } from 'src/schemas';
import { HomeDto } from './home.dto';
import { HomeTypes } from 'src/utlis/enum';

@Controller('home')
@ApiTags('Home')
export class HomeController {
  constructor(@InjectModel(Home.name) private model: Model<HomeDocument>) {}

  @Post()
  async create(@Body() dto: HomeDto) {
    try {
      return await this.model.create(dto);
    } catch (error) {}
  }

  @Get(':type')
  async find(@Param('type') type: string) {
    try {
      return await this.model.find({ type })

    } catch (error) {
      console.log(error);
    }
  }

  @Put(':id')
  async put(@Param('id') id: string, @Body() dto: HomeDto) {
    try {
      return await this.model.findByIdAndUpdate(id, dto);
    } catch (error) {
      console.log(error);
    }
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.model.findOneAndDelete({ _id: id });
    } catch (error) {
      console.log(error);
    }
  }
}
