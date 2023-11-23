import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Info, InfoDocument } from 'src/schemas';
import { Messages } from 'src/utlis/strings';
import { InfoDto } from './info.dto';
import { InfoTypes } from 'src/utlis/enum';

@Injectable()
export class InfoService {
  constructor(@InjectModel(Info.name) private model: Model<InfoDocument>) {}

  async find(limit: number, page: number) {
    try {
      return this.model
        .find()
        .limit(limit)
        .skip(limit * (page < 1 ? 1 : page - 1))
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
  async findType(type: InfoTypes, limit = 5, page) {
    try {
      return this.model
        .find({ types: type })
        .limit(limit)
        .skip(limit * (page < 1 ? 1 : page - 1))
        .exec();
    } catch (error) {
      console.log(error);
      throw new HttpException(Messages.occured, 500);
    }
  }

  async create(dto: InfoDto) {
    try {
      return this.model.create(dto);
    } catch (error) {
      console.log(error);
      throw new HttpException(Messages.occured, 500);
    }
  }

  async put(id: string, dto: InfoDto) {
    try {
      return this.model.findByIdAndUpdate(id, {
        dto,
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
