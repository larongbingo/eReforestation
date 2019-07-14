import { Module } from "@nestjs/common";
import { DatabaseConnectionConfig } from "./DatabaseConnectionConfig";
import { DatabaseConnectionProvider } from "./DatabaseConnection";

@Module({
  providers: [DatabaseConnectionConfig, DatabaseConnectionProvider],
  exports: [DatabaseConnectionProvider],
})
export class DatabaseModule {}

export default DatabaseModule;
