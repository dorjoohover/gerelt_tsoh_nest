import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsEnum, IsInt } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { InfoTypes } from 'src/utlis/enum';

import { User } from './user.schema';

export type InfoDocument = Document & Info;

@Schema({ timestamps: true })
export class Info {
  @Prop({ required: true })
  types: InfoTypes;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  text: string;

  @Prop()
  date: string;

  @Prop()
  duration: string;

  @Prop()
  thumbnail: string;

  @Prop()
  uri: string;

  @Prop()
  voice: string;
}

export const InfoSchema = SchemaFactory.createForClass(Info);
