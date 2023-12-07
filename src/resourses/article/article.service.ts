import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from 'src/schemas';
import { ArticleTypes } from 'src/utlis/enum';
import { Messages } from 'src/utlis/strings';
import { ArticleDto } from './article.dto';
import { GetDto } from 'src/utlis/dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name) private model: Model<ArticleDocument>,
  ) {}

  async find(dto: GetDto) {
    try {
      return this.model
        .find()
        .limit(dto.limit)
        .skip(dto.limit * (dto.page < 0 ? 0 : dto.page))
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
  async findType(type: ArticleTypes, dto: GetDto) {
    try {
      const res = await this.model
        .find({ types: type.toUpperCase() })
        .limit(dto.limit)
        .skip(dto.limit * (dto.page < 0 ? 0 : dto.page))
        .exec();
      const count = await this.model
        .find({ types: type.toUpperCase() })
        .countDocuments();
      return {
        data: res,
        count: count,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(Messages.occured, 500);
    }
  }

  async create(dto: ArticleDto) {
    try {
      return this.model.create(dto);
    } catch (error) {
      console.log(error);
      throw new HttpException(Messages.occured, 500);
    }
  }

  async put(id: string, dto: ArticleDto) {
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
