import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty, MinLength } from "class-validator";

import { IUser } from "../../../../../interfaces/models/IUser";

export class CreateUserDto implements IUser {

  @ApiModelProperty({required: true})
  @IsNotEmpty()
  username: string;

  @ApiModelProperty({required: true})
  @MinLength(8)
  password: string;

}
