import { Controller, UseGuards, Get, Param, Inject, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOkResponse, ApiOperation, ApiUseTags, ApiUnauthorizedResponse, ApiImplicitHeader } from "@nestjs/swagger";

import { IPermissionService } from "../../../../../../interfaces/services/IPermissionService";
import { IUserListService } from "../../../../../../interfaces/services/IUserListService";
import { IUser } from "../../../../../../interfaces/models/IUser";
import { UserEntity } from "../../../../decorators/User-Entity.Decorator";

@Controller("/admin")
export class UserListController {
  constructor(
    @Inject(IUserListService) private readonly userListService: IUserListService,
    @Inject(IPermissionService) private readonly permissionService: IPermissionService,
  ) {}

  @ApiUseTags("Admin")
  @ApiOperation({title: "Get User List", description: "Lists all registered users"})
  @ApiImplicitHeader({name: "Authorization", required: true})
  @ApiOkResponse({description: "The list of users registered"})
  @ApiUnauthorizedResponse({description: "The account must have admin or sudo permission"})
  @Get("/users")
  @UseGuards(AuthGuard("bearer"))
  public async getUserList(@UserEntity() user: IUser) {
    if(this.permissionService.isUserAdminOrSuperUser(user.id))
      throw new UnauthorizedException("User does not have permission");
    const users = await this.userListService.getUserList();
    return {iat: Date.now(), users};
  }

  @ApiUseTags("Admin")
  @ApiOperation({title: "Get Participating User List", description: "Lists all users who volunteered to an event"})
  @ApiImplicitHeader({name: "Authorization", required: true})
  @ApiOkResponse({description: "The list of users volunteered"})
  @ApiUnauthorizedResponse({description: "The account must have admin or sudo permission"})
  @Get("/users/:eventId")
  @UseGuards(AuthGuard("bearer"))
  public async getUserListByEventId(@Param("eventId") eventId: string, @UserEntity() user: IUser) {
    if(this.permissionService.isUserAdminOrSuperUser(user.id))
      throw new UnauthorizedException("User does not have permission");
    const users = await this.userListService.getUserListByEventId(eventId);
    return {iat: Date.now(), users};
  }
}
