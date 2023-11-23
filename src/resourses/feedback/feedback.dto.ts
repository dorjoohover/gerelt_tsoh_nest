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
  @IsNumber()
  number: number;

  @ApiProperty({ required: true })
  @IsString()
  value: string;
}


