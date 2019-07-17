import { Provider } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";

import { ContactPerson } from "./models/ContactPerson.Model";
import { Event } from "./models/Event.Model";
import { Log } from "./models/Log.Model";
import { News } from "./models/News.Model";
import { Permission } from "./models/Permission.Model";
import { User } from "./models/User.Model";
import { UserDetails } from "./models/UserDetails.Model";
import { DatabaseConnectionConfig } from "./DatabaseConnectionConfig";

export const DatabaseConnectionKey = "DatabaseConnection";
export const DatabaseConnection = new Sequelize(new DatabaseConnectionConfig());

DatabaseConnection.addModels([
  ContactPerson,
  Event,
  Log,
  News,
  Permission,
  User,
  UserDetails,
]);

export const DatabaseConnectionProvider: Provider = {
  provide: DatabaseConnectionKey,
  useValue: DatabaseConnection,
};
