import { Strategy } from "passport-http-bearer";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException, Inject } from "@nestjs/common";

import { ISessionVerify } from "../../../../interfaces/services/IAuthService";

@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(ISessionVerify) private readonly sessionVerificationService: ISessionVerify,
  ) { super(); }

  public async validate(token: string) {
    const user = await this.sessionVerificationService.validateUser(token);
    if (!user) { throw new UnauthorizedException(); }
    return user;
  }
}
