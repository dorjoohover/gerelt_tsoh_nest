import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { MedicalTypes, SymbolTypes } from 'src/utlis/enum';

export type MedicalDocument = Document & Medical;
export type MedicalDetailDocument = Document & MedicalDetail;
export type MedicalDetailsDocument = Document & MedicalDetails;

@Schema({ timestamps: true })
export class MedicalDetail {
  @Prop({ required: true })
  title: string;

  @Prop()
  text: string;

  @Prop()
  img: string;
}
export const MedicalDetailSchema = SchemaFactory.createForClass(MedicalDetail);

@Schema({ timestamps: true })
export class MedicalDetails {
  @Prop({ required: true })
  title: string;

  @Prop({ type: [MedicalDetailSchema], default: [] })
  detail: MedicalDetail[];
}
export const MedicalDetailsSchema =
  SchemaFactory.createForClass(MedicalDetails);
@Schema({ timestamps: true })
export class MedicalMore {
  @Prop({ required: true })
  type: MedicalTypes;

  @Prop({ type: [MedicalDetailsSchema], default: [] })
  detail: MedicalDetails[];
}
export const MedicalMoreSchema = SchemaFactory.createForClass(MedicalMore);

@Schema({ timestamps: true })
export class Medical {
  @Prop({ required: true })
  symbols: SymbolTypes;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  text: string;

  @Prop({ type: [MedicalMoreSchema], default: [] })
  details: MedicalMore[];
  @Prop({ type: [], default: [] })
  condition: string[];
}

export const MedicalSchema = SchemaFactory.createForClass(Medical);
