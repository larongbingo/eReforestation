import { Provider } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";

import { ContactPerson } from "./models/ContactPerson.Model";
import { Event } from "./models/Event.Model";
import { User } from "./models/User.Model";
import { DatabaseConnectionConfig } from "./DatabaseConnectionConfig";

export const DatabaseConnection_Key = "DatabaseConnection";
export const DatabaseConnection = new Sequelize(new DatabaseConnectionConfig());

DatabaseConnection.addModels([
  ContactPerson,
  Event,
  User,
]);

export const DatabaseConnectionProvider: Provider = {
  provide: DatabaseConnection_Key,
  useValue: DatabaseConnection,
};
