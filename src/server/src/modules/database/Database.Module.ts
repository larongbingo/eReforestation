import { Module } from "@nestjs/common";
import { DatabaseConnectionConfig } from "./DatabaseConnectionConfig";
import { DatabaseConnectionSingleton } from "./DatabaseConnectionSingleton";

@Module({
  providers: [DatabaseConnectionConfig, DatabaseConnectionSingleton],
  exports: [DatabaseConnectionSingleton],
})
export class DatabaseModule {}

export default DatabaseModule;
