import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsEnum, IsInt } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { LegalTypes } from 'src/utlis/enum';

import { User } from './user.schema';

export type LegalDocument = Document & Legal;

export class Detail {
  @Prop({ required: true })
  title: string;
  @Prop()
  text: string;
}

@Schema({ timestamps: true })
export class Legal {
  @Prop({ required: true })
  types: LegalTypes;

  @Prop({ required: true })
  title: string;

  @Prop()
  text: string;

  @Prop()
  date: string;

  @Prop()
  chief: string;

  @Prop()
  location: string;

  @Prop()
  number: string;

  @Prop({ type: Array<Detail> })
  details: Detail[];
}

export const LegalSchema = SchemaFactory.createForClass(Legal);
