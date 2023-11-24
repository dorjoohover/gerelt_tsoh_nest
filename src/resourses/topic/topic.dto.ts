import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsEnum, IsInt } from 'class-validator';

import { SymbolTypes } from 'src/utlis/enum';

export class TopicDto {

  types: SymbolTypes;

  @ApiProperty({ required: true })
  @IsString()
  title: string;

  @ApiProperty()
  text: string;
}
