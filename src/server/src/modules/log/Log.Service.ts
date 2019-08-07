import { Injectable, Provider } from "@nestjs/common";

import { ILogService } from "../../../../interfaces/services/ILogService";
import { Log } from "../database/models/Log.Model";

@Injectable()
export class LogService implements ILogService {

  public async log(event: string, description: string, params?: string): Promise<void> {
    Log.create({event, description, params});
  }

}

export const LogServiceProvider: Provider<LogService> = {
  provide: ILogService,
  useClass: LogService,
};
