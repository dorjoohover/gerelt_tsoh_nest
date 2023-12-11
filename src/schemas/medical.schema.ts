import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
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

  @Prop({type: []})
  img: string[];
  @Prop({ required: true })
  parent: boolean;
}
export const MedicalDetailSchema = SchemaFactory.createForClass(MedicalDetail);

@Schema({ timestamps: true })
export class MedicalDetails {
  @Prop({ required: true })
  title: string;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'MedicalDetails',
  })
  detail: MedicalDetail[];
  @Prop({ required: true })
  parent: boolean;
}
export const MedicalDetailsSchema =
  SchemaFactory.createForClass(MedicalDetails);

export class MedicalMore {
  @Prop({ required: true })
  type: MedicalTypes;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'medicalDetails' }],
  })
  detail: MedicalDetails[];
}

@Schema({ timestamps: true })
export class Medical {
  @Prop({ required: true })
  symbols: SymbolTypes;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  text: string;

  @Prop({ type: [MedicalMore], default: [] })
  details: MedicalMore[];
  @Prop({ type: [], default: [] })
  condition: string[];
  @Prop({ type: [], default: [] })
  setup: string[];
}

export const MedicalSchema = SchemaFactory.createForClass(Medical);
