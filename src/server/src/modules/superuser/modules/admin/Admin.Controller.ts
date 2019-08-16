import { Controller, Inject, UseGuards, Delete, Put, Param, Body } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

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

  @Put("/ban/:userIdToUnban")
  @UseGuards(AuthGuard("bearer"))
  public async adminUnbansUser(@UserEntity() adminUser: IUser, @Param("userIdToUnban") userId: string) {
    this.adminService.unbanUser(adminUser.id, userId);
    this.adminMailService.mailUserOnUnban(userId);
    return {iat: Date.now()};
  }

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
