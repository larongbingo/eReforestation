import { Injectable, Provider, Inject, UnauthorizedException, BadRequestException } from "@nestjs/common";

import { IAdminService, IAdminMailingService } from "../../../../../../interfaces/services/IAdminService";
import { IPermissionService } from "../../../../../../interfaces/services/IPermissionService";
import { IEventParticipantsService } from "../../../../../../interfaces/services/IEventParticipantsService";
import { IUserService } from "../../../../../../interfaces/services/IUserService";
import { IEventParticipants } from "../../../../../../interfaces/models/IEventParticipants";

@Injectable()
export class AdminService implements IAdminService {
  constructor(
    @Inject(IPermissionService) private readonly permissionService: IPermissionService,
    @Inject(IEventParticipantsService) private readonly eventParticipantsService: IEventParticipantsService,
    @Inject(IUserService) private readonly userService: IUserService,
  ) {}

  public async confirmParticipantApplication(adminId: string, confirmationId: string): Promise<IEventParticipants> {
    await this.throwErrorOnUnauthorizedAccess(adminId);
    return this.eventParticipantsService.updateOneById(confirmationId, { confirmed: true });
  }

  public async revokeParticipantApplication(adminId: string, confirmationId: string): Promise<IEventParticipants> {
    await this.throwErrorOnUnauthorizedAccess(adminId);
    return await this.eventParticipantsService.updateOneById(confirmationId, { confirmed: false });
  }

  public async banUser(adminId: string, userId: string, reason: string): Promise<void> {
    await this.throwErrorOnUnauthorizedAccess(adminId);
    this.userService.destroyUser(userId);
  }

  public async unbanUser(adminId: string, userId: string): Promise<void> {
    await this.throwErrorOnUnauthorizedAccess(adminId);
    this.userService.restoreUser(userId);
  }

  private async throwErrorOnUnauthorizedAccess(userId: string) {
    if (!await this.permissionService.isUserAdminOrSuperUser(userId)) {
      throw new UnauthorizedException("You do not have access or right");
    }
  }
}

export const AdminServiceProvider: Provider = {
  provide: IAdminService,
  useClass: AdminService,
};
