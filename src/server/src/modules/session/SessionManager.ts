import { Injectable, Inject, Provider } from "@nestjs/common";
import { sign } from "jsonwebtoken";

import { ISessionManager, ISessionValidator } from "../../../../interfaces/services/ISessionService";
import { IUser } from "../../../../interfaces/models/IUser";
import { ISession } from "../../../../interfaces/models/ISession";
import { IUserService } from "../../../../interfaces/services/IUserService";

@Injectable()
export class SessionManager implements ISessionManager, ISessionValidator {
  constructor(
    @Inject(IUserService) private readonly userService: IUserService,
  ) {}

  private readonly JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY || "Supercalifragilisticexpialidocious";

  private readonly sessions: ISession[];

  private JwtGeneratorTokenFunc: (data: any) => string = (data) => sign(data, this.JWT_PRIVATE_KEY);
  public get JwtGeneratorToken() { return this.JwtGeneratorTokenFunc; }
  public set JwtGeneratorToken(func: (data: any) => string) { this.JwtGeneratorTokenFunc = func; }

  public validateSession(token: string): string {
    for (const session of this.sessions) {
      if (token === session.token) {
        return session.userId;
      }
    }
    return null;
  }

  public createSession(userId: string, reqMetadata: {userAgent: string, ipAddress: string}): string {
    const token = this.JwtGeneratorTokenFunc({userId, ...reqMetadata});
    this.sessions.push({
      userId,
      userAgent: reqMetadata.userAgent,
      ipAddress: reqMetadata.ipAddress,
      token,
    });
    return token;
  }

  destroySession(token: string): boolean {
    throw new Error("Method not implemented.");
  }
}

export const SessionManagerProvider: Provider = {
  provide: ISessionManager,
  useClass: SessionManager,
};
