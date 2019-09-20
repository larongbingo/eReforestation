import { Provider, Injectable, Logger } from "@nestjs/common";
import * as dotenv from "dotenv";
import fs from "fs";

import { IConfigService } from "../../../../interfaces/services/IConfigService";

@Injectable()
export class EnvConfigService implements IConfigService {

  private readonly envConfig: {[key: string]: string};

  constructor() {
    Logger.log("Using .env file");
    // tslint:disable-next-line: tsr-detect-non-literal-fs-filename
    this.envConfig = dotenv.parse(fs.readFileSync(`${process.env.NODE_ENV || "development"}.env`));
  }

  public get(key: string): string {
    return this.envConfig[key];
  }

}

export const EnvConfigServiceProvider: Provider = {
  provide: IConfigService,
  useClass:  EnvConfigService,
};
