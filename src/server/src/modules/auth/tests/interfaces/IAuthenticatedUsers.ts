import { IUser } from "../../../../../../interfaces/models/IUser";

export interface IAuthenticatedUser extends IUser {
  token: string;
}
