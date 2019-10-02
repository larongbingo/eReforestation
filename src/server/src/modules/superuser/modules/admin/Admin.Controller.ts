import { Controller, Inject, UseGuards, Delete, Put, Param, Body } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiUseTags, ApiCreatedResponse, ApiUnauthorizedResponse, ApiImplicitHeader, ApiOperation, ApiImplicitParam } from "@nestjs/swagger";

import { IAdminService, IAdminMailingService } from "../../../../../../interfaces/services/IAdminService";
import { IUser } from "../../../../../../interfaces/models/IUser";
import { UserEntity } from "../../../../decorators/User-Entity.Decorator";

import { BanUserDto } from "./dto/BanUser.Dto";

@Controller("/admin")
export class AdminController {
  constructor(
    @Inject(IAdminService) private readonly adminService: IAdminService,
    @Inject(IAdminMailingService) private readonly adminMailService: IAdminMailingService,
  ) {}

  @ApiUseTags("Admin")
  @ApiOperation({title: "Ban User"})
  @ApiImplicitParam({name: "userIdToBan", required: true})
  @ApiImplicitHeader({name: "Authorization", required: true})
  @ApiCreatedResponse({description: "Indicates that the user has been banned"})
  @ApiUnauthorizedResponse({description: "The account must have an admin or sudo permission"})
  @Delete("/ban/:userIdToBan")
  @UseGuards(AuthGuard("bearer"))
  public async adminBansUser(
    @UserEntity() adminUser: IUser,
    @Param("userIdToBan") userId: string,
    @Body() banUserDto: BanUserDto,
  ) {
    this.adminService.banUser(adminUser.id, userId, banUserDto.reason);
    this.adminMailService.mailUserOnBan(userId);
    return {iat: Date.now()};
  }

  @ApiUseTags("Admin")
  @ApiOperation({title: "Unban User"})
  @ApiImplicitParam({name: "userIdToBan", required: true})
  @ApiImplicitHeader({name: "Authorization", required: true})
  @ApiCreatedResponse({description: "Indicates that the user has been unbanned"})
  @ApiUnauthorizedResponse({description: "The account must have an admin or sudo permission"})
  @Put("/ban/:userIdToUnban")
  @UseGuards(AuthGuard("bearer"))
  public async adminUnbansUser(@UserEntity() adminUser: IUser, @Param("userIdToUnban") userId: string) {
    this.adminService.unbanUser(adminUser.id, userId);
    this.adminMailService.mailUserOnUnban(userId);
    return {iat: Date.now()};
  }

  @ApiUseTags("Admin")
  @ApiOperation({title: "Confirm Participation of User in an event"})
  @ApiImplicitParam({name: "confirmationId", required: true})
  @ApiImplicitHeader({name: "Authorization", required: true})
  @ApiCreatedResponse({description: "The details of the event and user that was confirmed to join the event"})
  @ApiUnauthorizedResponse({description: "The account must have an admin or sudo permission"})
  @Put("/application/confirm/:confirmationId")
  @UseGuards(AuthGuard("bearer"))
  public async adminConfirmsEventApplication(
    @UserEntity() adminUser: IUser,
    @Param("confirmationId") confirmationId: string,
  ) {
    const eventParticipation = await this.adminService.confirmParticipantApplication(adminUser.id, confirmationId);
    this.adminMailService.mailUserOnSuccessfulApplication(eventParticipation.userId);
    return {iat: Date.now(), eventParticipation};
  }

  @ApiUseTags("Admin")
  @ApiOperation({title: "Revoke Participation of User in an event"})
  @ApiImplicitParam({name: "confirmationId", required: true})
  @ApiImplicitHeader({name: "Authorization", required: true})
  @ApiCreatedResponse({description: "The details of the event and user that was revoked to join the event"})
  @ApiUnauthorizedResponse({description: "The account must have an admin or sudo permission"})
  @Delete("/application/revoke/:confirmationId")
  @UseGuards(AuthGuard("bearer"))
  public async adminRevokesEventConfirmation(
    @UserEntity() adminUser: IUser,
    @Param("confirmationId") confirmationId: string,
  ) {
    const eventParticipation = await this.adminService.revokeParticipantApplication(adminUser.id, confirmationId);
    this.adminMailService.mailUserOnFailedApplication(eventParticipation.userId);
    return {iat: Date.now(), eventParticipation};
  }

}
