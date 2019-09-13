import { Provider } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";

import { ContactPerson } from "./models/ContactPerson.Model";
import { Event } from "./models/Event.Model";
import { EventParticipants } from "./models/EventParticipants.Model";
import { Image } from "./models/Image.Model";
import { Log } from "./models/Log.Model";
import { News } from "./models/News.Model";
import { Permission } from "./models/Permission.Model";
import { Session } from "./models/Session.Model";
import { User } from "./models/User.Model";
import { UserConfirmDelete } from "./models/UserConfirmDelete.Model";
import { UserDetails } from "./models/UserDetails.Model";
import { DatabaseConnectionConfig } from "./DatabaseConnectionConfig";

export const DatabaseConnectionKey = "DatabaseConnection";
export const DatabaseConnection = new Sequelize(new DatabaseConnectionConfig());

DatabaseConnection.addModels([
  ContactPerson,
  Event,
  EventParticipants,
  Log,
  Image,
  News,
  Permission,
  Session,
  User,
  UserConfirmDelete,
  UserDetails,
]);

export const DatabaseConnectionProvider: Provider = {
  provide: DatabaseConnectionKey,
  useValue: DatabaseConnection,
};
