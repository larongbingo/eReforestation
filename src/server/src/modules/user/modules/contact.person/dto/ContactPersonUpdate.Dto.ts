import { IsNotEmpty, IsEmail } from "class-validator";

export class ContactPersonUpdateDto {
  public readonly firstName?: string;

  public readonly middleName?: string;
  
  public readonly lastName?: string;
  
  public readonly address?: string;
  
  public readonly phoneNumber?: string;
  
  @IsEmail()
  public readonly emailAddress?: string;
}
