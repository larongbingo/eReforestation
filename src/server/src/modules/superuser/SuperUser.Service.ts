import { Injectable, Inject, Provider } from "@nestjs/common";

import { IPermissionService } from "../../../../interfaces/services/IPermissionService";
import { ISuperUserService } from "../../../../interfaces/services/ISuperUserService";
import { ILogService } from "../../../../interfaces/services/ILogService";
import { ILog } from "../../../../interfaces/models/ILog";

@Injectable()
export class SuperUserService implements ISuperUserService {

  constructor(
    @Inject(ILogService) private readonly logService: ILogService,
    @Inject(IPermissionService) private readonly permissionService: IPermissionService,
  ) {}

  public async getEventLogs(sudoId: string): Promise<ILog[]> {
    this.logService.log("Get Logs", `user ${sudoId} requested event logs`, JSON.stringify({sudoId}));
    return this.logService.getLogs();
  }

  public async assignUserAsAdmin(sudoId: string, userId: string): Promise<void> {
    this.permissionService.setAdminPermission(userId);
    this.logService.log(
      "Assign Admin Permission",
      `user ${sudoId} assigned admin to user ${userId}`,
      JSON.stringify({sudoId, userId}),
    );
  }

  public async assignUserAsSuperUser(sudoId: string, userId: string): Promise<void> {
    this.permissionService.setSuperUserPermission(userId);
    this.logService.log(
      "Assign SuperUser Permission",
      `user ${sudoId} assigned superuser to user ${userId}`,
      JSON.stringify({sudoId, userId}),
    );
  }

}

export const SuperUserServiceProvider: Provider<SuperUserService> = {
  provide: ISuperUserService,
  useClass: SuperUserService,
};
