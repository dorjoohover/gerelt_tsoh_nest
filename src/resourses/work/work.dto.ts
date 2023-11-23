import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsEnum, IsInt } from 'class-validator';

import { WorkTypes } from 'src/utlis/enum';

export class WorkDto {
  @ApiProperty({ enum: WorkTypes })
  @IsEnum(WorkTypes)
  types: WorkTypes;
  @ApiProperty({ required: true })
  @IsString()
  title: string;
  @ApiProperty()
  text: string;

  @ApiProperty()
  postDate: string;

  @ApiProperty()
  fb: string;

  @ApiProperty()
  twitter: string;

  @ApiProperty()
  uri: string;

  @ApiProperty()
  img: string;

  @ApiProperty()
  semiTitle: string;
}
