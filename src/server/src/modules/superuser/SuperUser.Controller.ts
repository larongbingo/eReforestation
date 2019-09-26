import { Controller, Inject, UseGuards, Get, Put, Param, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { ITextsService } from "../../../../interfaces/services/ITextsService";
import { ISuperUserService } from "../../../../interfaces/services/ISuperUserService";
import { IPermissionService } from "../../../../interfaces/services/IPermissionService";
import { IUser } from "../../../../interfaces/models/IUser";
import { UserEntity } from "../../decorators/User-Entity.Decorator";
import { TEXTS_KEYS } from "../texts/Texts.Key";

@Controller("/admin")
export class SuperUserController {

  constructor(
    @Inject(ISuperUserService) private readonly sudoService: ISuperUserService,
    @Inject(IPermissionService) private readonly permissionService: IPermissionService,
    @Inject(ITextsService) private readonly texts: ITextsService,
  ) {}

  @Get("/logs")
  @UseGuards(AuthGuard("bearer"))
  public async getLogs(@UserEntity() admin: IUser) {
    await this.isUserHasSudoPermission(admin.id);
    const logs = await this.sudoService.getEventLogs(admin.id);
    return {iat: Date.now(), logs};
  }

  @Put("/setAdmin/:userId")
  @UseGuards(AuthGuard("bearer"))
  public async assignAdminToUser(@UserEntity() admin: IUser, @Param("userId") userId: string) {
    await this.isUserHasSudoPermission(admin.id);
    this.sudoService.assignUserAsAdmin(admin.id, userId);
    return {iat: Date.now()};
  }

  @Put("/setSudo/:userId")
  @UseGuards(AuthGuard("bearer"))
  public async assignSudoToUser(@UserEntity() admin: IUser, @Param("userId") userId: string) {
    await this.isUserHasSudoPermission(admin.id);
    this.sudoService.assignUserAsSuperUser(admin.id, userId);
    return {iat: Date.now()};
  }

  private async isUserHasSudoPermission(userId: string) {
    if (!await this.permissionService.isUserSuperUser(userId)) {
      throw new UnauthorizedException(
        this.texts.getText(TEXTS_KEYS.MISSING_SUDO_CREDENTIALS),
      );
    }
  }

}
