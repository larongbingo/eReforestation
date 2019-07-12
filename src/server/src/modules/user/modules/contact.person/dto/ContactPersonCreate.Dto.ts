import { IsNotEmpty, IsEmail } from "class-validator";

import { IContactPerson } from "../../../../../../../interfaces/models/IContactPerson";

export class ContactPersonCreateDto implements IContactPerson {
  @IsNotEmpty()
  public readonly firstName: string;

  @IsNotEmpty()
  public readonly middleName: string;
  
  @IsNotEmpty()
  public readonly lastName: string;
  
  @IsNotEmpty()
  public readonly address: string;
  
  @IsNotEmpty()
  public readonly phoneNumber: string;
  
  @IsEmail()
  @IsNotEmpty()
  public readonly emailAddress: string;
}
