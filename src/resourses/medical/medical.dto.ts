import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { MedicalTypes, SymbolTypes } from 'src/utlis/enum';

export class MedicalDetailDto {
  @ApiProperty({ required: true })
  title: string;

  @ApiProperty()
  text: string;
  @ApiProperty()
  img: any;
}

export class MedicalDetailsDto {
  @ApiProperty({ required: true })
  @IsString()
  title: string;

  @ApiProperty({ type: Array })
  detail: string[];
  // @ApiProperty({ type: Array<MedicalDetailDto> })
  // detail: MedicalDetailDto[];
}
export class MedicalMoreDto {
  @ApiProperty({ enum: MedicalTypes })
  @IsEnum(MedicalTypes)
  type: MedicalTypes;

  @ApiProperty({ type: Array })
  details: string[];
}

export class MedicalDto {

  @ApiProperty({ required: true })
  title: string;

  @ApiProperty({ required: true })
  text: string;

  @Prop({ type: Array<MedicalMoreDto> })
  details: MedicalMoreDto[];
  @Prop({ type: Array<string> })
  condition: string[];
}
