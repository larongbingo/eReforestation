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

  private readonly sessions: ISession[] = [];

  private JwtGeneratorTokenFunc: (data: any) => string = (data) => sign(data, this.JWT_PRIVATE_KEY);
  public get JwtGeneratorToken() { return this.JwtGeneratorTokenFunc; }
  public set JwtGeneratorToken(func: (data: any) => string) { this.JwtGeneratorTokenFunc = func; }

  public validateSession(token: string): string {
    let userId = null;
    for (const session of this.sessions) {
      if (token === session.token) {
        userId = session.userId;
      }
    }
    return userId ;
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
    let isTokenDestroyed = false;
    this.sessions.forEach((sessionToken, i) => {
      if (token === sessionToken.token) {
        isTokenDestroyed = true;
        this.sessions.splice(i, 1);
      }
    });
    return isTokenDestroyed;
  }
}

export const SessionManagerProvider: Provider<ISessionManager> = {
  provide: ISessionManager,
  useClass: SessionManager,
};

export const SessionValidatorProvider: Provider<ISessionValidator> = {
  provide: ISessionValidator,
  useClass: SessionManager,
};
