import { Controller, UseGuards, Get, Inject, UnauthorizedException, Res } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
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
  @Get("/test")
  @UseGuards(AuthGuard("bearer"))
  public async initiateTesting(@UserEntity() user: IUser, @Res() res: Response) {
    if (!await this.permissionService.isUserSuperUser(user.id)) {
      throw new UnauthorizedException(
        this.texts.getText(TEXTS_KEYS.MISSING_SUDO_CREDENTIALS),
      );
    }

    const testingSpawn = spawn("npm", ["run", "test"]);
    testingSpawn.stdout.pipe(res);
  }

}
