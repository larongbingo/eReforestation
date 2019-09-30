import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class BanUserDto {

  @ApiModelProperty({required: true})
  @IsNotEmpty()
  reason: string;

}
