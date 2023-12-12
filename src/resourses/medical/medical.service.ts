import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Medical,
  MedicalDetail,
  MedicalDetailDocument,
  MedicalDetails,
  MedicalDetailsDocument,
  MedicalDocument,
} from 'src/schemas';
import { GetDto } from 'src/utlis/dto';
import { SymbolTypes } from 'src/utlis/enum';
import { Messages, api } from 'src/utlis/strings';
import { MedicalDetailDto, MedicalDetailsDto, MedicalDto } from './medical.dto';
import axios from 'axios';
import { SymbolType } from 'src/utlis/functions';
@Injectable()
export class MedicalService {
  constructor(
    @InjectModel(Medical.name) private model: Model<MedicalDocument>,
    @InjectModel(MedicalDetail.name)
    private detailModel: Model<MedicalDetailDocument>,
    @InjectModel(MedicalDetails.name)
    private detailsModel: Model<MedicalDetailsDocument>,
  ) {}

  async find(dto: GetDto) {
    try {
      return this.model
        .find({}, '_id title text')
        .limit(dto.limit)
        .skip(dto.limit * (dto.page < 0 ? 0 : dto.page))
        .exec();
    } catch (error) {
      console.log(error);
      throw new HttpException(Messages.occured, 500);
    }
  }
  async findDetail() {
    try {
      return this.detailsModel.find({ parent: false });
      // .limit(dto.limit)
      // .skip(dto.limit * (dto.page < 1 ? 1 : dto.page - 1))
      // .exec();
    } catch (error) {
      console.log(error);
      throw new HttpException(Messages.occured, 500);
    }
  }
  async findDetails() {
    try {
      return this.detailsModel.find({ parent: true });

      // .limit(dto.limit)
      // .skip(dto.limit * (dto.page < 1 ? 1 : dto.page - 1))
      // .exec();
    } catch (error) {
      console.log(error);
      throw new HttpException(Messages.occured, 500);
    }
  }
  async findById(id: string) {
    try {
      return await this.model.findById(id).populate({
        path: 'details.details',
        select: 'title detail',
        model: this.detailsModel,
        populate: {
          path: 'detail',
          model: this.detailsModel,
          select: 'title text img',
        },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(Messages.occured, 500);
    }
  }
  async findSymbol(type: SymbolTypes, dto: GetDto) {
    try {
      let res = await this.model
        .find({ symbols: type.toUpperCase() }, '_id title text')
        .limit(dto.limit)
        .skip(dto.limit * (dto.page < 0 ? 0 : dto.page))
        .sort({
          title: 1,
        })
        .exec();

      let count = await this.model
        .find({ symbols: type.toUpperCase() })
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
  //   async findDetailsType(type: SymbolTypes, dto: GetDto) {
  //     try {
  //       return this.detailsModel
  //         .find({})
  //         .limit(dto.limit)
  //         .skip(dto.limit * (dto.page < 1 ? 1 : dto.page - 1))
  //         .exec();
  //     } catch (error) {
  //       console.log(error);
  //       throw new HttpException(Messages.occured, 500);
  //     }
  //   }
  //   async findDetailsParent(type: SymbolTypes, dto: GetDto) {
  //     try {
  //       return this.model
  //         .find({ symbols: type })
  //         .limit(dto.limit)
  //         .skip(dto.limit * (dto.page < 1 ? 1 : dto.page - 1))
  //         .exec();
  //     } catch (error) {
  //       console.log(error);
  //       throw new HttpException(Messages.occured, 500);
  //     }
  //   }

  async create(dto: MedicalDto) {
    try {
      return this.model.create({
        ...dto,
        symbols: SymbolType(dto.title),
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(Messages.occured, 500);
    }
  }

  async createDetail(dto: MedicalDetailDto) {
    try {
      let detail = await this.detailModel.findOne({ title: dto.title });
      if (!detail) {
        let res = await this.detailModel.create({ ...dto, parent: false });
        return res._id;
      } else {
        return detail._id;
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(Messages.occured, 500);
    }
  }
  async createDetails(dto: MedicalDetailsDto) {
    try {
      return await this.detailsModel.create({ ...dto, parent: true });
    } catch (error) {
      console.log(error);
      throw new HttpException(Messages.occured, 500);
    }
  }

  async put(id: string, dto: MedicalDto) {
    try {
      return await this.model.findByIdAndUpdate(id, {
        dto,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(Messages.occured, 500);
    }
  }
  async detailPut(id: string, dto: MedicalDetailDto) {
    try {
      console.log(dto);
      return await this.detailModel.findByIdAndUpdate(id, {
        ...dto,
        img: dto.img,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(Messages.occured, 500);
    }
  }
  async detailsPut(id: string, dto: MedicalDetailsDto) {
    try {
      return await this.detailsModel.findByIdAndUpdate(id, {
        dto,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(Messages.occured, 500);
    }
  }
  async deleteById(id: string) {
    try {
      return await this.model.deleteOne({
        _id: id,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(Messages.occured, 500);
    }
  }
  async deleteDetailById(id: string) {
    try {
      return await this.detailModel.deleteOne({
        _id: id,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(Messages.occured, 500);
    }
  }
  async deleteDetailsById(id: string) {
    try {
      return this.detailsModel.deleteOne({
        _id: id,
      });
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
  async deleteDetail() {
    try {
      return this.detailModel.deleteMany();
    } catch (error) {
      console.log(error);
      throw new HttpException(Messages.occured, 500);
    }
  }
  async deleteDetails() {
    try {
      return this.detailsModel.deleteMany();
    } catch (error) {
      console.log(error);
      throw new HttpException(Messages.occured, 500);
    }
  }
}
