import { Controller, Inject, UseGuards, Get, Put, Param, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOkResponse, ApiImplicitHeader, ApiOperation, ApiUseTags } from "@nestjs/swagger";

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

  @ApiUseTags("SuperUser")
  @ApiOperation({title: "Get Account Action Logs", description: "Retrieves all actions done in all accounts"})
  @ApiImplicitHeader({name: "Authorization", required: true})
  @ApiOkResponse({description: "Account action logs"})
  @Get("/logs")
  @UseGuards(AuthGuard("bearer"))
  public async getLogs(@UserEntity() admin: IUser) {
    await this.isUserSudo(admin.id);
    const logs = await this.sudoService.getEventLogs(admin.id);
    return {iat: Date.now(), logs};
  }

  @ApiUseTags("SuperUser")
  @ApiOperation({title: "Assign Admin Permission", description: "Assigns Admin Permission to the given user"})
  @ApiImplicitHeader({name: "Authorization", required: true})
  @ApiOkResponse({description: "The time the Admin permission was given"})
  @Put("/setAdmin/:userId")
  @UseGuards(AuthGuard("bearer"))
  public async assignAdminToUser(@UserEntity() admin: IUser, @Param("userId") userId: string) {
    await this.isUserSudo(admin.id);
    this.sudoService.assignUserAsAdmin(admin.id, userId);
    return {iat: Date.now()};
  }

  @ApiUseTags("SuperUser")
  @ApiOperation({title: "Assign Admin Permission", description: "Assigns Admin Permission to the given user"})
  @ApiImplicitHeader({name: "Authorization", required: true})
  @ApiOkResponse({description: "The time the Admin permission was given"})
  @Put("/setSudo/:userId")
  @UseGuards(AuthGuard("bearer"))
  public async assignSudoToUser(@UserEntity() admin: IUser, @Param("userId") userId: string) {
    await this.isUserSudo(admin.id);
    this.sudoService.assignUserAsSuperUser(admin.id, userId);
    return {iat: Date.now()};
  }

  private async isUserSudo(userId: string) {
    if (!await this.permissionService.isUserSuperUser(userId)) {
      throw new UnauthorizedException(
        this.texts.getText(TEXTS_KEYS.MISSING_SUDO_CREDENTIALS),
      );
    }
  }

}
