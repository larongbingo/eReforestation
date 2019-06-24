import { IUser } from '../../../../interfaces/IUser';

export class UserEntity implements IUser {
  public readonly firstName: string;
  public readonly middleName: string;
  public readonly lastName: string;
  public readonly address: string;
  public readonly username: string;
  public readonly password: string;
  public readonly emailAddress: string;
  public readonly phoneNumber: string;
}
