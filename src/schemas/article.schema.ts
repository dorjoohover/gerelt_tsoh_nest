import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { Document } from 'mongoose';
import { ArticleTypes } from 'src/utlis/enum';

export type ArticleDocument = Document & Article;

@Schema({ timestamps: true })
export class Article {
  @Prop({ required: true })
  types: ArticleTypes;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  text: string;

  @Prop()
  postDate: string;

  @Prop()
  img: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
