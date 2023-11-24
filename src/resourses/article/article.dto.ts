import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

import { ArticleTypes } from 'src/utlis/enum';

export class ArticleDto {
  @ApiProperty({ required: true, default: ArticleTypes.ARTICLE })
  @IsEnum(ArticleTypes)
  types: ArticleTypes;

  @ApiProperty({ required: true })
  title: string;

  @ApiProperty({ required: true })
  text: string;

  @ApiProperty()
  postDate: string;

  @ApiProperty()
  img: string;
}
