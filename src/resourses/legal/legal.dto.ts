import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsEnum, IsInt } from 'class-validator';
import { Detail } from 'src/utlis/dto';

import { LegalTypes } from 'src/utlis/enum';



export class LegalDto {
  @ApiProperty({ enum: LegalTypes })
  @IsEnum(LegalTypes)
  types: LegalTypes;

  @ApiProperty({ required: true })
  @IsString()
  title: string;

  @ApiProperty()
  text: string;

  @ApiProperty()
  date: string;

  @ApiProperty()
  chief: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  number: string;
  @ApiProperty({ type: Array<Detail> })
  details: Detail[];
}
