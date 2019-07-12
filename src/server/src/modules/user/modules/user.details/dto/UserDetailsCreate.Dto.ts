import { IUserDetails } from "../../../../../../../interfaces/models/IUserDetails";

export class UserDetailsCreateDto implements IUserDetails {
  public readonly firstName: string;
  public readonly middleName: string;
  public readonly lastName: string;
  public readonly dateOfBirth: Date;
  public readonly address: string;
  public readonly phoneNumber: string;
  public readonly emailAddress: string;
} 
