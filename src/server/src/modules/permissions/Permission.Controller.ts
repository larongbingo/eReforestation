import { Controller, Inject, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { IPermissionService } from "../../../../interfaces/services/IPermissionService";
import { IUser } from "../../../../interfaces/models/IUser";
import { UserEntity } from "../../decorators/User-Entity.Decorator";

@Controller("/permission")
export class PermissionController {
  constructor(
    @Inject(IPermissionService) private readonly permissionService: IPermissionService,
  ) {}

  @Get()
  @UseGuards(AuthGuard("bearer"))
  public async getPermission(@UserEntity() user: IUser) {
    const permission = await this.permissionService.getPermission(user.id);
    return {iat: Date.now(), permission};
  }
}
