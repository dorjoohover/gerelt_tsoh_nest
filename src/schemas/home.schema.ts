import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { Document } from 'mongoose';
import { HomeTypes } from 'src/utlis/enum';

export type HomeDocument = Document & Home;

@Schema({ timestamps: true })
export class Home {
  @Prop({ required: true })
  type: HomeTypes;

  @Prop({ required: true })
  imgs: string[];
}

export const HomeSchema = SchemaFactory.createForClass(Home);
