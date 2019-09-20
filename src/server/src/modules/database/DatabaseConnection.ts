import { Provider, Injectable, Inject } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";

import { DatabaseConnectionConfig } from "../config/configs/database/DatabaseConnectionConfig";

import { ContactPerson } from "./models/ContactPerson.Model";
import { Event } from "./models/Event.Model";
import { EventParticipants } from "./models/EventParticipants.Model";
import { Image } from "./models/Image.Model";
import { News } from "./models/News.Model";
import { Permission } from "./models/Permission.Model";
import { User } from "./models/User.Model";
import { UserConfirmDelete } from "./models/UserConfirmDelete.Model";
import { UserDetails } from "./models/UserDetails.Model";

@Injectable()
export class DatabaseConnection {

  constructor(
    @Inject(DatabaseConnectionConfig) private readonly dbConfig: DatabaseConnectionConfig,
  ) {
    this.connection.addModels([
      ContactPerson,
      Event,
      EventParticipants,
      Image,
      News,
      Permission,
      User,
      UserConfirmDelete,
      UserDetails,
    ]);
  }

  public readonly connection = new Sequelize(this.dbConfig);

}
