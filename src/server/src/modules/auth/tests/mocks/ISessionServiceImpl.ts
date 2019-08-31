import { ISessionService } from "../../../../../../interfaces/services/ISessionService";
import { IAuthenticatedUsersArray } from "../constants/IAuthenticatedUsersArray";
import { IAuthenticatedUser } from "../interfaces/IAuthenticatedUsers";

export class ISessionServiceImpl implements ISessionService {

  private users: IAuthenticatedUser[] = [...IAuthenticatedUsersArray];

  public async validateSession(token: string): Promise<string> {
    let id = null;

    this.users.forEach(user => {
      if (user.token === token) {
        id = user.id;
      }
    });

    return id;
  }

  public async createSession(userId: string, reqMetadata: { userAgent: string; ipAddress: string; }): Promise<string> {
    const token = JSON.stringify({userId, ...reqMetadata});
    this.users.push({
      username: "testing123",
      password: "testing123",
      token,
    });
    return token;
  }

  public async destroySession(token: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
