import { ISessionValidator } from "../../../../../../interfaces/services/ISessionService";
import { IAuthenticatedUsersArray } from "../constants/IAuthenticatedUsersArray";
import { IAuthenticatedUser } from "../interfaces/IAuthenticatedUsers";

export class ISessionValidatorImpl implements ISessionValidator {
  private users: IAuthenticatedUser[] = IAuthenticatedUsersArray;

  public validateSession(token: string): string {
    let id = null;

    this.users.forEach(user => {
      if (user.token === token) {
        id = user.id;
      }
    });

    return id;
  }
}
