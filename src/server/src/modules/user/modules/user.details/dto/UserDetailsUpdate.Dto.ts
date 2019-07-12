import { IsDate, IsEmail, ValidateIf } from "class-validator";

import { IUserDetails } from "../../../../../../../interfaces/models/IUserDetails";

export class UserDetailsUpdateDto {
  
  public readonly firstName?: string;

  public readonly middleName?: string;

  public readonly lastName?: string;

  @ValidateIf(o => o !== "")
  @IsDate()
  public readonly dateOfBirth?: Date;

  public readonly address?: string;

  public readonly phoneNumber?: string;

  @ValidateIf(o => o !== "")
  @IsEmail()
  public readonly emailAddress?: string;
} 
