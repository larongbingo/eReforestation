import { Controller, Inject, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiCreatedResponse, ApiBadRequestResponse, ApiUseTags } from "@nestjs/swagger";

import { IPermissionService } from "../../../../interfaces/services/IPermissionService";
import { IUser } from "../../../../interfaces/models/IUser";
import { UserEntity } from "../../decorators/User-Entity.Decorator";

@Controller("/permission")
export class PermissionController {
  constructor(
    @Inject(IPermissionService) private readonly permissionService: IPermissionService,
  ) {}

  @ApiUseTags("Participant")
  @ApiCreatedResponse({description: "The permission setting of the account"})
  @ApiBadRequestResponse({description: "The session string is not valid"})
  @Get()
  @UseGuards(AuthGuard("bearer"))
  public async getPermission(@UserEntity() user: IUser) {
    const permission = await this.permissionService.getPermission(user.id);
    return {iat: Date.now(), permission};
  }
}
