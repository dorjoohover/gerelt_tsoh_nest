import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Messages } from 'src/utlis/strings';

import { WorkDto } from './work.dto';
import { Work, WorkDocument } from 'src/schemas';
import { WorkTypes } from 'src/utlis/enum';
import { GetDto } from 'src/utlis/dto';

@Injectable()
export class WorkService {
  constructor(@InjectModel(Work.name) private model: Model<WorkDocument>) {}

  async find(dto: GetDto) {
    try {
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
  async findType(type: WorkTypes, dto: GetDto) {
    try {
      let res = await this.model
        .find({ types: type.toUpperCase() })
        .limit(dto.limit)
        .skip(dto.limit * (dto.page < 0 ? 0 : dto.page ))
        .exec();
        let count = await this.model.find({types: type.toUpperCase()}).countDocuments()
        return {
          data: res,
          count: count
        }
    } catch (error) {
      console.log(error);
      throw new HttpException(Messages.occured, 500);
    }
  }

  async create(dto: WorkDto) {
    try {
      if (!dto.postDate) {
        dto.postDate = new Date().toJSON().toString().substring(0, 10);
      }
      return this.model.create(dto);
    } catch (error) {
      console.log(error);
      throw new HttpException(Messages.occured, 500);
    }
  }

  async put(id: string, dto: WorkDto) {
    try {
      if (!dto.postDate) {
        dto.postDate = new Date().toJSON().toString().substring(0, 10);
      }
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
