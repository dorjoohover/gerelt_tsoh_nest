import { ApiProperty } from '@nestjs/swagger';
import { UserTypes } from 'src/utlis/enum';
import { IsEnum, IsString } from 'class-validator';
export class UserDto {
  @ApiProperty({ enum: UserTypes })
  @IsEnum(UserTypes)
  role: UserTypes;

  @ApiProperty()
  @IsString()
  username: string;
  @ApiProperty({ default: 'string' })
  @IsString()
  password: string;
}
export class LoginDto {


  @ApiProperty()
  @IsString()
  username: string;
  @ApiProperty({ default: 'string' })
  @IsString()
  password: string;
}
