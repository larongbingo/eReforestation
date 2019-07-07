import {
  Controller,
  Get,
  UseGuards,
  Headers,
  Body,
  Post,
  UnprocessableEntityException,
  UsePipes,
  Put,
  Inject,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { ICredentialsVerify } from "../../../../interfaces/services/IAuthService";
import { ISessionManager } from "../../../../interfaces/services/ISessionService";

import { IpAddress } from "./decorators/IpAddress.Decorator";
import { UserAgent } from "./decorators/UserAgent.Decorator";
import { CredentialsDto } from "./dto/credentials.dto";
import { LogInValidationPipe } from "./pipes/login-validation.pipe";

@Controller("auth")
export class AuthController {
  constructor(
    @Inject(ICredentialsVerify) private readonly credentialsVerificationService: ICredentialsVerify,
    @Inject(ISessionManager) private readonly sessionManagerService: ISessionManager,
  ) {}

  @Get("verify")
  @UseGuards(AuthGuard("bearer"))
  public async verifySession(@Headers("authorization") sessionToken: string) {
    return { iat: Date.now(), isSessionValid: true, sessionToken };
  }

  @Put()
  @UseGuards(AuthGuard("bearer"))
  public async logOut(@Headers("authorization") sessionToken: string) {
    this.sessionManagerService.destroySession(sessionToken);
    return { iat: Date.now() };
  }

  @Post()
  @UsePipes(new LogInValidationPipe())
  public async login(
    @Body() credentialDto: CredentialsDto,
    @IpAddress() ipAddress: string,
    @UserAgent() userAgent: string,
  ) {
    const user = await this.credentialsVerificationService.checkCredentials(
      credentialDto.username,
      credentialDto.password,
    );

    if (!user) { return new UnprocessableEntityException("Incorrect Username/Password"); }

    const token = this.sessionManagerService.createSession(user.id, {ipAddress, userAgent});
    return { iat: Date.now(), token };
  }
}
