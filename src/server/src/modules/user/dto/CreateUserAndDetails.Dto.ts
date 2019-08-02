import { IsISO8601, MinLength, IsNotEmpty } from "class-validator";

import { IUser } from "../../../../../interfaces/models/IUser";
import { IUserDetails } from "../../../../../interfaces/models/IUserDetails";

export class CreateUserAndDetailsDto implements IUser, IUserDetails {
  @MinLength(8)
  username: string;

  // TODO: Add validation for 1 Special Char, 1 Capitalized Letter, 1 Number
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  firstName: string;

  middleName: string;

  @IsNotEmpty()
  lastName: string;

  @IsISO8601()
  dateOfBirth: Date;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  emailAddress: string;
}
