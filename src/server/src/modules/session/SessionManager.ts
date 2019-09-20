import { Injectable, Inject, Provider } from "@nestjs/common";
import { sign } from "jsonwebtoken";

import { IConfigService } from "../../../../interfaces/services/IConfigService";
import { ISessionService } from "../../../../interfaces/services/ISessionService";
import { ISessionModelService } from "../../../../interfaces/services/ISessionModelService";
import { Session } from "../database/models/Session.Model";

@Injectable()
export class SessionManager implements ISessionService {

  constructor(
    @Inject(ISessionModelService) private readonly sessionModelService: ISessionModelService,
    @Inject(IConfigService) private readonly envConfig: IConfigService,
  ) {}

  private readonly JWT_PRIVATE_KEY = this.envConfig.get("JWT_PRIVATE_KEY") || "Supercalifragilisticexpialidocious";

  private JwtGeneratorTokenFunc: (data: any) => string = (data) => sign(data, this.JWT_PRIVATE_KEY);
  public get JwtGeneratorToken() { return this.JwtGeneratorTokenFunc; }
  public set JwtGeneratorToken(func: (data: any) => string) { this.JwtGeneratorTokenFunc = func; }

  public async validateSession(token: string): Promise<string> {
    const session =  await this.sessionModelService.findOneByToken(token);
    return session.userId;
  }

  public async createSession(userId: string, reqMetadata: {userAgent: string, ipAddress: string}): Promise<string> {
    const token = this.JwtGeneratorTokenFunc({userId, ...reqMetadata});
    await this.sessionModelService.createSession({
      userId,
      userAgent: reqMetadata.userAgent,
      ipAddress: reqMetadata.ipAddress,
      token,
    });
    return token;
  }

  public async destroySession(token: string): Promise<boolean> {
    this.sessionModelService.destroySessionByToken(token);
    return true;
  }
}

export const SessionServiceProvider: Provider<ISessionService> = {
  provide: ISessionService,
  useClass: SessionManager,
};
