import { ApiModelProperty } from "@nestjs/swagger";
import { IsISO8601, MinLength, IsNotEmpty, IsEmail } from "class-validator";

import { IUser } from "../../../../../interfaces/models/IUser";
import { IUserDetails } from "../../../../../interfaces/models/IUserDetails";

export class CreateUserAndDetailsDto implements IUser, IUserDetails {

  @ApiModelProperty({required: true})
  @MinLength(8)
  username: string;

  // TODO: Add validation for 1 Special Char, 1 Capitalized Letter, 1 Number
  @ApiModelProperty({required: true})
  @MinLength(8)
  password: string;

  @ApiModelProperty({required: true})
  @IsNotEmpty()
  firstName: string;

  @ApiModelProperty({required: false})
  middleName: string;

  @ApiModelProperty({required: true})
  @IsNotEmpty()
  lastName: string;

  @ApiModelProperty({required: true})
  @IsISO8601()
  dateOfBirth: Date;

  @ApiModelProperty({required: true})
  @IsNotEmpty()
  address: string;

  @ApiModelProperty({required: true})
  @IsNotEmpty()
  phoneNumber: string;

  @ApiModelProperty({required: true})
  @IsNotEmpty()
  @IsEmail()
  emailAddress: string;
}
