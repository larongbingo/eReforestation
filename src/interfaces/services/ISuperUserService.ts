import { ILog } from "../models/ILog";
import { IPermissions } from "../models/IPermissions";

export const ISuperUserService = "ISuperUserService";
export interface ISuperUserService {
  getEventLogs(sudoId: string): Promise<ILog[]>;
  assignUserAsAdmin(sudoId: string, userId: string): Promise<void>;
  assignUserAsSuperUser(sudoId: string, userId: string): Promise<void>;
}
