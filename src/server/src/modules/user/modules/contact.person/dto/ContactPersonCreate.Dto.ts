import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail } from "class-validator";

import { IContactPerson } from "../../../../../../../interfaces/models/IContactPerson";

export class ContactPersonCreateDto implements IContactPerson {
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
  public readonly address: string;

  @ApiModelProperty({required: true})
  @IsNotEmpty()
  public readonly phoneNumber: string;

  @ApiModelProperty({required: true})
  @IsEmail()
  @IsNotEmpty()
  public readonly emailAddress: string;
}
