import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Topic, TopicDocument } from 'src/schemas';
import { GetDto } from 'src/utlis/dto';
import { SymbolTypes } from 'src/utlis/enum';
import { Messages } from 'src/utlis/strings';
import { TopicDto } from './topic.dto';
import { SymbolType } from 'src/utlis/functions';

@Injectable()
export class TopicService {
  constructor(@InjectModel(Topic.name) private model: Model<TopicDocument>) {}

  async find(dto: GetDto) {
    try {
      console.log(dto);
      return this.model
        .find()
        .limit(dto.limit)
        .skip(dto.limit * (dto.page < 0 ? 0 : dto.page ))
        .exec();
    } catch (error) {
      console.log(error);
      throw new HttpException(Messages.occured, 500);
    }
  }
  async findById(id: string) {
    try {
      return this.model.findById(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(Messages.occured, 500);
    }
  }
  async findType(type: SymbolTypes, dto: GetDto) {
    try {
      let res = await this.model
        .find({ type: type })
        .limit(dto.limit)
        .skip(dto.limit * (dto.page < 0 ? 0 : dto.page))
        .exec();
      let count = await this.model.find({type: type}).countDocuments()
      return {
        data: res,
        count: count
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(Messages.occured, 500);
    }
  }

  async create(dto: TopicDto) {
    try {
      return this.model.create({ ...dto, type: SymbolType(dto.title) });
    } catch (error) {
      console.log(error);
      throw new HttpException(Messages.occured, 500);
    }
  }

  async put(id: string, dto: TopicDto) {
    try {
      return this.model.findByIdAndUpdate(id, {
        ...dto,
        type: SymbolType(dto.title),
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(Messages.occured, 500);
    }
  }
  async deleteById(id: string) {
    try {
      return this.model.findByIdAndRemove(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(Messages.occured, 500);
    }
  }
  async delete() {
    try {
      return this.model.deleteMany();
    } catch (error) {
      console.log(error);
      throw new HttpException(Messages.occured, 500);
    }
  }
}
