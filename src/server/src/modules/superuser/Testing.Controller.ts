import {
  Controller,
  UseGuards,
  Get,
  Inject,
  UnauthorizedException,
  Res,
  InternalServerErrorException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOkResponse, ApiUseTags, ApiOperation, ApiImplicitHeader, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { spawn } from "child_process";
import { Response } from "express";

import { ITextsService } from "../../../../interfaces/services/ITextsService";
import { IPermissionService } from "../../../../interfaces/services/IPermissionService";
import { UserEntity } from "../../decorators/User-Entity.Decorator";
import { IUser } from "../../../../interfaces/models/IUser";
import { TEXTS_KEYS } from "../texts/Texts.Key";

@Controller("/admin")
export class TestingController {

  constructor(
    @Inject(IPermissionService) private readonly permissionService: IPermissionService,
    @Inject(ITextsService) private readonly texts: ITextsService,
  ) {}

  /**
   * Pipe the test results to page
   */
  @ApiUseTags("SuperUser")
  @ApiOperation({title: "Test Modules", description: "Runs the testing suite"})
  @ApiImplicitHeader({name: "Authorization", required: true})
  @ApiOkResponse({description: "The log result of the tests"})
  @ApiUnauthorizedResponse({description: "The account must have sudo permission"})
  @Get("/test")
  @UseGuards(AuthGuard("bearer"))
  public async initiateTesting(@UserEntity() user: IUser, @Res() res: Response) {
    if (!await this.permissionService.isUserSuperUser(user.id)) {
      throw new UnauthorizedException(
        this.texts.getText(TEXTS_KEYS.MISSING_SUDO_CREDENTIALS),
      );
    }

    try {
      const testingSpawn = spawn(/^win/.test(process.platform) ? "jest.cmd" : "jest");
      testingSpawn.stderr.pipe(res);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

}
