import { Controller, UseGuards, Get, Inject, UnauthorizedException, Res } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { spawn } from "child_process";
import { Response } from "express";

import { IPermissionService } from "../../../../interfaces/services/IPermissionService";
import { UserEntity } from "../../decorators/User-Entity.Decorator";
import { IUser } from "../../../../interfaces/models/IUser";

@Controller("/admin")
export class TestingController {

  constructor(
    @Inject(IPermissionService) private readonly permissionService: IPermissionService,
  ) {}

  /**
   * Pipe the test results to page
   */
  @Get("/test")
  @UseGuards(AuthGuard("bearer"))
  public async initiateTesting(@UserEntity() user: IUser, @Res() res: Response) {
    if (!await this.permissionService.isUserSuperUser(user.id)) {
      throw new UnauthorizedException("User does not have admin access");
    }

    const testingSpawn = spawn("npm", ["run", "test"]);
    testingSpawn.stdout.pipe(res);
  }

}
