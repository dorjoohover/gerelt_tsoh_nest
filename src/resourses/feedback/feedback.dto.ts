import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsEnum,
  IsInt,
  IsNumber,
} from 'class-validator';



export class FeedBackDetailDto {
  @ApiProperty({ required: true })
  @IsString()
  question: string;

  @ApiProperty({ required: true })
  @IsNumber()
  number: number;
  @ApiProperty({ required: true })
  @IsString()
  value: string;
  @ApiProperty({ required: true })
  @IsString()
  text: string;
}


