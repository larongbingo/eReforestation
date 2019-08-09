import { Injectable, Inject } from "@nestjs/common";

import { ISuperUserService } from "../../../../interfaces/services/ISuperUserService";
import { ILogService } from "../../../../interfaces/services/ILogService";
import { IUser } from "../../../../interfaces/models/IUser";
import { ILog } from "../../../../interfaces/models/ILog";

@Injectable()
export class SuperUserService implements ISuperUserService {

  constructor(
    @Inject(ILogService) private readonly logService: ILogService,
  ) {}

  public async getEventLogs(sudoId: string): Promise<ILog[]> {
    return this.logService.getLogs();
  }

  public async assignUserAsAdmin(sudoId: string, userId: string): Promise<IUser> {
    throw new Error("Method not implemented.");
  }

  public async assignUserAsSuperUser(sudoId: string, userId: string): Promise<IUser> {
    throw new Error("Method not implemented.");
  }

}
