import { ISessionVerify } from "../../../../../../interfaces/services/IAuthService";
import { IUser } from "../../../../../../interfaces/models/IUser";
import { IAuthenticatedUser } from "../interfaces/IAuthenticatedUsers";
import { IAuthenticatedUsersArray } from "../constants/IAuthenticatedUsersArray";

export class ISessionVerifyImpl implements ISessionVerify {
  private authedUsers: IAuthenticatedUser[] = IAuthenticatedUsersArray;

  public validateUser(token: string): Promise<IUser> {
    let validUser = null;

    this.authedUsers.forEach((user) => {
      if (token === user.token) {
        validUser = user;
      }
    });

    return validUser;
  }
}
