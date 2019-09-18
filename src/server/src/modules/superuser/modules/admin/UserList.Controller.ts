import { Controller, UseGuards, Get, Param, Inject, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { IPermissionService } from "../../../../../../interfaces/services/IPermissionService";
import { IUserListService } from "../../../../../../interfaces/services/IUserListService";
import { IUser } from "../../../../../../interfaces/models/IUser";
import { UserEntity } from "../../../../decorators/User-Entity.Decorator";

@Controller("/admin")
export class UserListController {
  constructor (
    @Inject(IUserListService) private readonly userListService: IUserListService,
    @Inject(IPermissionService) private readonly permissionService: IPermissionService,
  ) {}

  @Get("/users")
  @UseGuards(AuthGuard("bearer"))
  public async getUserList(@UserEntity() user: IUser) {
    if(this.permissionService.isUserAdminOrSuperUser(user.id))
      throw new UnauthorizedException("User does not have permission");
    const users = await this.userListService.getUserList();
    return {iat: Date.now(), users};
  }

  @Get("/users/:eventId")
  @UseGuards(AuthGuard("bearer"))
  public async getUserListByEventId(@Param("eventId") eventId: string, @UserEntity() user: IUser) {
    if(this.permissionService.isUserAdminOrSuperUser(user.id))
      throw new UnauthorizedException("User does not have permission");
    const users = await this.userListService.getUserListByEventId(eventId);
    return {iat: Date.now(), users};
  }
}
