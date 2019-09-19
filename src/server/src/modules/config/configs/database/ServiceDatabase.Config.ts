import { Injectable, Inject } from "@nestjs/common";

import { DatabaseConnectionConfig } from "./DatabaseConnectionConfig";

@Injectable()
export class ServiceDatabaseConfig extends DatabaseConnectionConfig {

  database = this.config.get(SERVICE_DATABASE_ENV_KEYS.SVC_DB_NAME) || "thesisService";

}

export const SERVICE_DATABASE_ENV_KEYS = {
  SVC_DB_NAME: "SERVER_HOST_NAME",
};
