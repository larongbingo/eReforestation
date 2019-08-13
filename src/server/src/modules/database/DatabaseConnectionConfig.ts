import { Injectable } from "@nestjs/common";
import { ISequelizeConfig } from "sequelize-typescript";

@Injectable()
export class DatabaseConnectionConfig implements ISequelizeConfig {
  username = process.env.DATABASE_USERNAME || "root";
  password = process.env.DATABASE_PASSWORD || "root";
  database = process.env.DATABASE_NAME || "thesis";
  port = Number(process.env.DATABASE_PORT) || 3306;
  host = process.env.DATABASE_HOST || "192.168.0.1";
  dialect = "mysql";
}
