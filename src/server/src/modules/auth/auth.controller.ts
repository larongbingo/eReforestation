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
import { ApiCreatedResponse, ApiUseTags, ApiOperation, ApiOkResponse } from "@nestjs/swagger";

import { ICredentialsVerify } from "../../../../interfaces/services/IAuthService";
import { ISessionService } from "../../../../interfaces/services/ISessionService";
import { ITextsService } from "../../../../interfaces/services/ITextsService";
import { TEXTS_KEYS } from "../texts/Texts.Key";

import { IpAddress } from "./decorators/IpAddress.Decorator";
import { UserAgent } from "./decorators/UserAgent.Decorator";
import { CredentialsDto } from "./dto/credentials.dto";

@Controller("auth")
export class AuthController {
  constructor(
    @Inject(ICredentialsVerify) private readonly credentialsVerificationService: ICredentialsVerify,
    @Inject(ISessionService) private readonly sessionManagerService: ISessionService,
    @Inject(ITextsService) private readonly texts: ITextsService,
  ) {}

  @ApiUseTags("Participant")
  @ApiOperation({title: "Verify Session", description: "Checks if the given session string is still valid"})
  @ApiOkResponse({description: "The session string is valid"})
  @Get("verify")
  @UseGuards(AuthGuard("bearer"))
  public async verifySession(@Headers("authorization") sessionToken: string) {
    return { iat: Date.now(), isSessionValid: true, sessionToken };
  }

  @ApiUseTags("Participant")
  @ApiOperation({title: "Log out", description: "Removes the given session string from the list of valid sessions"})
  @ApiOkResponse({description: "The session string is now invalid"})
  @Put()
  @UseGuards(AuthGuard("bearer"))
  public async logOut(@Headers("authorization") sessionToken: string) {
    this.sessionManagerService.destroySession(sessionToken);
    return { iat: Date.now() };
  }

  @ApiUseTags("Participant")
  @ApiOperation({title: "Log In", description: "Creates a new session string if the given credentials are valid"})
  @ApiCreatedResponse({description: "The session string"})
  @Post()
  public async login(
    @Body() credentialDto: CredentialsDto,
    @IpAddress() ipAddress: string,
    @UserAgent() userAgent: string,
  ) {
    const user = await this.credentialsVerificationService.checkCredentials(
      credentialDto.username,
      credentialDto.password,
    );

    if (!user) {
      throw new UnprocessableEntityException(
        this.texts.getText(TEXTS_KEYS.AUTH_INCORRECT_CREDENTIALS),
      );
    }

    const token = await this.sessionManagerService.createSession(user.id, {ipAddress, userAgent});
    return { iat: Date.now(), token };
  }
}
