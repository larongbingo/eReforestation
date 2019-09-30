import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsISO8601, IsEmail } from "class-validator";

import { IUserDetails } from "../../../../../../../interfaces/models/IUserDetails";

export class UserDetailsCreateDto implements IUserDetails {

  @ApiModelProperty({required: true})
  @IsNotEmpty()
  public readonly firstName: string;

  @ApiModelProperty({required: true})
  @IsNotEmpty()
  public readonly middleName: string;

  @ApiModelProperty({required: true})
  @IsNotEmpty()
  public readonly lastName: string;

  @ApiModelProperty({required: true})
  @IsNotEmpty()
  @IsISO8601()
  public readonly dateOfBirth: Date;

  @ApiModelProperty({required: true})
  @IsNotEmpty()
  public readonly address: string;

  @ApiModelProperty({required: true})
  @IsNotEmpty()
  public readonly phoneNumber: string;

  @ApiModelProperty({required: true})
  @IsNotEmpty()
  @IsEmail()
  public readonly emailAddress: string;
}
