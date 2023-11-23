import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsEnum, IsInt } from 'class-validator';

import { InfoTypes } from 'src/utlis/enum';

export class InfoDto {
  @ApiProperty({ required: true, default: InfoTypes.TEXT })
  @IsEnum(InfoTypes)
  types: InfoTypes;

  @ApiProperty({ required: true })
  @IsString()
  title: string;

  @ApiProperty({ required: true })
  @IsString()
  text: string;

  @ApiProperty({ required: true })
  date: string;

  @ApiProperty()
  duration: string;

  @ApiProperty()
  thumbnail: string;

  @ApiProperty()
  uri: string;

  @ApiProperty()
  voice: string;
}

