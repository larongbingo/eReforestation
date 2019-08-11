import { Controller, Inject, UseGuards, Get, Put, Param, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { ISuperUserService } from "../../../../interfaces/services/ISuperUserService";
import { IPermissionService } from "../../../../interfaces/services/IPermissionService";
import { IUser } from "../../../../interfaces/models/IUser";
import { UserEntity } from "../../decorators/User-Entity.Decorator";

@Controller("/admin")
export class SuperUserController {

  constructor(
    @Inject(ISuperUserService) private readonly sudoService: ISuperUserService,
    @Inject(IPermissionService) private readonly permissionService: IPermissionService,
  ) {}

  @Get("/logs")
  @UseGuards(AuthGuard("bearer"))
  public async getLogs(@UserEntity() admin: IUser) {
    if (!await this.permissionService.isUserSuperUser(admin.id)) {
      return new UnauthorizedException("User does not have permission");
    }

    const logs = await this.sudoService.getEventLogs(admin.id);
    return {iat: Date.now(), logs};
  }

  @Put("/setAdmin/:userId")
  @UseGuards(AuthGuard("bearer"))
  public async assignAdminToUser(@UserEntity() admin: IUser, @Param("userId") userId: string) {
    if (!await this.permissionService.isUserSuperUser(admin.id)) {
      return new UnauthorizedException("User does not have permission");
    }

    this.sudoService.assignUserAsAdmin(admin.id, userId);
    return {iat: Date.now()};
  }

  @Put("/setSudo/:userId")
  @UseGuards(AuthGuard("bearer"))
  public async assignSudoToUser(@UserEntity() admin: IUser, @Param("userId") userId: string) {
    if (!await this.permissionService.isUserSuperUser(admin.id)) {
      return new UnauthorizedException("User does not have permission");
    }

    this.sudoService.assignUserAsSuperUser(admin.id, userId);
    return {iat: Date.now()};
  }

}
