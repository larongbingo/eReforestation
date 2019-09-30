import { ApiModelPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail } from "class-validator";

import { IContactPerson } from "../../../../../../../interfaces/models/IContactPerson";

export class ContactPersonUpdateDto implements Partial<IContactPerson> {

  @ApiModelPropertyOptional()
  public readonly firstName?: string;

  @ApiModelPropertyOptional()
  public readonly middleName?: string;

  @ApiModelPropertyOptional()
  public readonly lastName?: string;

  @ApiModelPropertyOptional()
  public readonly address?: string;

  @ApiModelPropertyOptional()
  public readonly phoneNumber?: string;

  @ApiModelPropertyOptional()
  @IsEmail()
  public readonly emailAddress?: string;
}
