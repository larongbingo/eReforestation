import { IsDate, IsEmail, IsOptional } from "class-validator";

import { IUserDetails } from "../../../../../../../interfaces/models/IUserDetails";

export class UserDetailsUpdateDto {
  @IsOptional()
  public readonly firstName?: string;

  @IsOptional()
  public readonly middleName?: string;

  @IsOptional()
  public readonly lastName?: string;

  @IsOptional()
  public readonly dateOfBirth?: Date;

  @IsOptional()
  public readonly address?: string;

  @IsOptional()
  public readonly phoneNumber?: string;

  @IsOptional()
  public readonly emailAddress?: string;
}
