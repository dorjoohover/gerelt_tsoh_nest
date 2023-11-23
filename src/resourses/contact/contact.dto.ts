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

export class ContactDto {
  @ApiProperty({ required: true })
  @IsString()
  lastname: string;
  @ApiProperty({ required: true })
  @IsString()
  firstname: string;
  @ApiProperty({ required: true })
  @IsString()
  title: string;
  @ApiProperty({ required: true })
  @IsString()
  text: string;
  @ApiProperty({ required: true })
  @IsEmail()
  email: string;
}
