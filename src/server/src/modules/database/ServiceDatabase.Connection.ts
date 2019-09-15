import { Provider } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";

import { DatabaseConnectionConfig } from "./DatabaseConnectionConfig";
import { Log } from "./models/Log.Model";
import { Session } from "./models/Session.Model";

const ServiceDatabaseConfig = new DatabaseConnectionConfig();
ServiceDatabaseConfig.database = process.env.SERVICE_DATABASE || "thesisService";

export const ServiceDatabaseConnection = new Sequelize({...ServiceDatabaseConfig});

ServiceDatabaseConnection.options.logging = function(message: string, details: any) {
  console.log(`Executing (service): ${message.split(":")[1]}`);
}

ServiceDatabaseConnection.addModels([
  Log,
  Session,
]);

export const ServiceDatabaseConnectionKey = "ServiceDatabaseConnectionKey";

export const ServiceDatabaseConnectionProvider: Provider = {
  provide: ServiceDatabaseConnectionKey,
  useValue: ServiceDatabaseConnection,
};
