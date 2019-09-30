import { ApiModelPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsEmail, IsOptional } from "class-validator";

import { IUserDetails } from "../../../../../../../interfaces/models/IUserDetails";

export class UserDetailsUpdateDto implements Partial<IUserDetails> {
  @ApiModelPropertyOptional()
  @IsOptional()
  public readonly firstName?: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  public readonly middleName?: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  public readonly lastName?: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  public readonly dateOfBirth?: Date;

  @ApiModelPropertyOptional()
  @IsOptional()
  public readonly address?: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  public readonly phoneNumber?: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  public readonly emailAddress?: string;
}
