import { ApiModelProperty } from "@nestjs/swagger";
import { MinLength } from "class-validator";

export class UpdateUserDto {
  @ApiModelProperty()
  @MinLength(8)
  password?: string;
}
