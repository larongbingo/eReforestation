import { Injectable, Inject } from "@nestjs/common";
import { ISequelizeConfig } from "sequelize-typescript";

import { IConfigService } from "../../../../../../interfaces/services/IConfigService";

@Injectable()
export class DatabaseConnectionConfig implements ISequelizeConfig {

  constructor(
    @Inject(IConfigService) protected readonly config: IConfigService,
  ) {}

  username = this.config.get(DATABASE_ENV_KEYS.DB_USERNAME) || "root";
  password = this.config.get(DATABASE_ENV_KEYS.DB_PASSWORD) || "root";
  database = this.config.get(DATABASE_ENV_KEYS.DB_NAME) || "thesis";
  port = Number(this.config.get(DATABASE_ENV_KEYS.DB_PORT)) || 3306;
  host = this.config.get(DATABASE_ENV_KEYS.DB_HOST) || "127.0.0.1";
  dialect = this.config.get(DATABASE_ENV_KEYS.DB_DIALECT) || "mysql";
}

export const DATABASE_ENV_KEYS = {
  DB_USERNAME: "DATABASE_USERNAME",
  DB_PASSWORD: "DATABASE_PASSWORD",
  DB_NAME: "DATABASE_NAME",
  DB_PORT: "DATABASE_PORT",
  DB_HOST: "DATABASE_HOST",
  DB_DIALECT: "DB_DIALECT",
};
