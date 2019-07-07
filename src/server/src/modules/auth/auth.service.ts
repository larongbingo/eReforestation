import { Injectable, Provider, Inject } from "@nestjs/common";
import { compare } from "bcrypt";

import { IUser } from "../../../../interfaces/models/IUser";
import { IUserService } from "../../../../interfaces/services/IUserService";
import { ISessionValidator } from "../../../../interfaces/services/ISessionService";
import { ICredentialsVerify, ISessionVerify } from "../../../../interfaces/services/IAuthService";

@Injectable()
export class AuthService implements ICredentialsVerify, ISessionVerify {
  constructor(
    @Inject(IUserService) private readonly userService: IUserService,
    @Inject(ISessionValidator) private readonly sessionValidationService: ISessionValidator,
  ) {}

  public async validateUser(token: string): Promise<IUser> {
    const userId = this.sessionValidationService.validateSession(token);
    return await this.userService.findOneById(userId);
  }

  public async checkCredentials(username: string, password: string): Promise<IUser> {
    const user = await this.userService.findOneByUsername(username);
    if (!user || !(await compare(password, user.password))) {
      return null;
    }
    return user;
  }
}

export const CredentialsVerifyProvider: Provider<ICredentialsVerify> = {
  provide: ICredentialsVerify,
  useClass: AuthService,
};

export const SessionVerifyProvider: Provider<ISessionVerify> = {
  provide: ISessionVerify,
  useClass: AuthService,
};
