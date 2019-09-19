import { Injectable, Provider, Logger } from "@nestjs/common";

import { IConfigService } from "../../../../interfaces/services/IConfigService";

@Injectable()
export class ProcessConfigService implements IConfigService {

  constructor() {
    Logger.log("Using process.env");
  }

  private values: {[key: string]: string} = {...process.env};

  public get(key: string): string {
    return this.values[key];
  }

}

export const ProcessConfigServiceProvider: Provider = {
  provide: IConfigService,
  useClass: ProcessConfigService,
};
