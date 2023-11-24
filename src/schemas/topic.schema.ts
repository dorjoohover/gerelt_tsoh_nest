import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { SymbolTypes } from 'src/utlis/enum';


export type TopicDocument = Document & Topic;

@Schema({ timestamps: true })
export class Topic {
  @Prop({ required: true })
  type: SymbolTypes;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  text: string;
}

export const TopicSchema = SchemaFactory.createForClass(Topic);
