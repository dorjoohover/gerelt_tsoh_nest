import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { Document } from 'mongoose';

export type ContactDocument = Document & Contact;

@Schema({ timestamps: true })
export class Contact {
  @Prop({ required: true })
  firstname: string;
  @Prop({ required: true })
  lastname: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true, maxlength: 500 })
  text: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
