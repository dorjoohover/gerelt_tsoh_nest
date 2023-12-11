import { ApiProperty } from "@nestjs/swagger";
import { HomeTypes } from "src/utlis/enum";

export class HomeDto {
    @ApiProperty({enum: HomeTypes})
    type: HomeTypes
    @ApiProperty()
    imgs: string[]
}