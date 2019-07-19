import { ISessionService } from "../../../../../../interfaces/services/ISessionService";
import { IAuthenticatedUsersArray } from "../constants/IAuthenticatedUsersArray";
import { IAuthenticatedUser } from "../interfaces/IAuthenticatedUsers";

export class ISessionServiceImpl implements ISessionService {

  private users: IAuthenticatedUser[] = [...IAuthenticatedUsersArray];

  public validateSession(token: string): string {
    let id = null;

    this.users.forEach(user => {
      if (user.token === token) {
        id = user.id;
      }
    });

    return id;
  }

  public createSession(userId: string, reqMetadata: { userAgent: string; ipAddress: string; }): string {
    const token = JSON.stringify({userId, ...reqMetadata});
    this.users.push({
      username: "testing123",
      password: "testing123",
      token,
    });
    return token;
  }

  public destroySession(token: string): boolean {
    throw new Error("Method not implemented.");
  }
}
