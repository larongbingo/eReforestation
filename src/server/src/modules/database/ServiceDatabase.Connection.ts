import { Provider, Logger, Inject, Injectable } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";

import { ServiceDatabaseConfig } from "../config/configs/database/ServiceDatabase.Config";

import { Log } from "./models/Log.Model";
import { Session } from "./models/Session.Model";

@Injectable()
export class ServiceDatabaseConnection {

  constructor(
    @Inject(ServiceDatabaseConfig) private readonly dbConfig: ServiceDatabaseConfig,
  ) {

    this.connection.addModels([
      Log,
      Session,
    ]);

    this.connection.options.logging = ServiceDatabaseLogging;

  }

  public readonly connection = new Sequelize(this.dbConfig);
}

function ServiceDatabaseLogging(message: string, details: any) {
  Logger.log(`Executing (service): ${message.split(":")[1]}`);
}
