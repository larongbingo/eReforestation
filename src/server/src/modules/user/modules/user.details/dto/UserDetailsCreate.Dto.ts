import { IsNotEmpty, IsDate, IsEmail } from "class-validator";

import { IUserDetails } from "../../../../../../../interfaces/models/IUserDetails";

export class UserDetailsCreateDto implements IUserDetails {

  @IsNotEmpty()
  public readonly firstName: string;

  @IsNotEmpty()
  public readonly middleName: string;

  @IsNotEmpty()
  public readonly lastName: string;

  @IsNotEmpty()
  public readonly dateOfBirth: Date;

  @IsNotEmpty()
  public readonly address: string;

  @IsNotEmpty()
  public readonly phoneNumber: string;

  @IsNotEmpty()
  @IsEmail()
  public readonly emailAddress: string;
}
