import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feedback, FeedbackDocument } from 'src/schemas';
import { Messages } from 'src/utlis/strings';
import { FeedBackDetailDto } from './feedback.dto';
import { GetDto } from 'src/utlis/dto';
import * as nodemailer from 'nodemailer';

import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel(Feedback.name) private model: Model<FeedbackDocument>,
    private mailer: MailerService,
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
  async findByDate(dto: GetDto) {
    try {
      return this.model
        .find({
          createdAt: { $and: [{ $lte: dto.startDate }, { $gte: dto.endDate }] },
        })
        .limit(dto.limit)
        .skip(dto.limit * (dto.page < 0 ? 0 : dto.page))
        .exec();
    } catch (error) {
      console.log(error);
      throw new HttpException(Messages.occured, 500);
    }
  }

  async create(dto: FeedBackDetailDto[]) {
    try {
      this.mailer.sendMail({
        to: 'erdemsaikhan.dev@gmail.com',
        subject: 'Санал хүсэлт ✔',
        text: `${dto.map((e) => {
          return e.number + '.' + e.question + ' => ' + e.text + '\n';
        })}`,
      });
      // this.send();
      return this.model.create(dto);
    } catch (error) {
      console.log(error);
      throw new HttpException(Messages.occured, 500);
    }
  }

  //   async put(id: string, dto: FeedBackDetailDto[]) {
  //     try {
  //       return this.model.findByIdAndUpdate(id, {
  //         dto,
  //       });
  //     } catch (error) {
  //       console.log(error);
  //       throw new HttpException(Messages.occured, 500);
  //     }
  //   }
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
