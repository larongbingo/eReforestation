import { ILog } from "../models/ILog";

export const ILogService = "ILogService";
export interface ILogService {
  log(event: string, description: string, param?: string): Promise<void>;

  getLogs(): Promise<ILog[]>;
}
