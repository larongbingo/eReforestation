import { Injectable } from "@nestjs/common";
import { ISequelizeConfig } from "sequelize-typescript";
import { Dialect } from "sequelize/types";

@Injectable()
export class DatabaseConnectionConfig implements ISequelizeConfig {
  username = process.env.DATABASE_USERNAME || "root";
  password = process.env.DATABASE_PASSWORD || "root";
  database = process.env.DATABASE_NAME || "thesis";
  dialect: Dialect = "mysql";
}