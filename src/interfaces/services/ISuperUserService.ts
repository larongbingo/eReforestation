import { ILog } from "../models/ILog";
import { IUser } from "../models/IUser";

export const ISuperUserService = "ISuperUserService";
export interface ISuperUserService {
  getEventLogs(sudoId: string): Promise<ILog[]>;
  assignUserAsAdmin(sudoId: string, userId: string): Promise<IUser>;
  assignUserAsSuperUser(sudoId: string, userId: string): Promise<IUser>;
}
