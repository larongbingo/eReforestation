import { Injectable, Inject } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";

import { ContactPerson } from "./models/ContactPerson.Model";
import { Event } from "./models/Event.Model";
import { User } from "./models/User.Model";
import { DatabaseConnectionConfig } from "./DatabaseConnectionConfig";

@Injectable()
export class DatabaseConnectionSingleton {
  constructor(@Inject() private dbConnConfig: DatabaseConnectionConfig) {}

  private databaseConnection: Sequelize;

  public getInstance() {
    if (!this.databaseConnection) {
      this.createInstance();
    }
    return this.databaseConnection;
  }

  private createInstance() {
    const sequelize = new Sequelize(this.dbConnConfig);
    this.loadModels(sequelize);
    this.databaseConnection = sequelize;
  }

  private loadModels(sequelize: Sequelize) {
    sequelize.addModels([ContactPerson, Event, User]);
  }
}

export default DatabaseConnectionSingleton;
