import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Legal, LegalDocument } from 'src/schemas';
import { LegalTypes } from 'src/utlis/enum';
import { Messages } from 'src/utlis/strings';
import { LegalDto } from './legal.dto';
import { GetDto } from 'src/utlis/dto';

@Injectable()
export class LegalService {
  constructor(@InjectModel(Legal.name) private model: Model<LegalDocument>) {}

  async find(dto: GetDto) {
    try {
      return this.model
        .find({}, "_id title")

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
  async findType(type: LegalTypes, dto: GetDto) {
    try {
      return this.model
        .find({ types: type }, "_id title")

        .exec();
    } catch (error) {
      console.log(error);
      throw new HttpException(Messages.occured, 500);
    }
  }

  async create(dto: LegalDto) {
    try {
      return this.model.create(dto);
    } catch (error) {
      console.log(error);
      throw new HttpException(Messages.occured, 500);
    }
  }

  async put(id: string, dto: LegalDto) {
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
