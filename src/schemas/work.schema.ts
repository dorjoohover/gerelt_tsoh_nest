import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { WorkTypes } from 'src/utlis/enum';



export type WorkDocument = Document & Work;

@Schema({ timestamps: true })
export class Work {
  @Prop({ required: true })
  types: WorkTypes;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  text: string;

  @Prop()
  postDate: string;

  @Prop()
  fb: string;

  @Prop()
  twitter: string;

  @Prop()
  uri: string;
  @Prop()
  img: string;

  @Prop()
  semiTitle: string;
}

export const WorkSchema = SchemaFactory.createForClass(Work);
