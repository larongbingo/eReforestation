import { Module, OnModuleDestroy, OnApplicationShutdown } from "@nestjs/common";

import { ConfigModule } from "../config/Config.Module";

import { DatabaseConnection } from "./DatabaseConnection";
import { ServiceDatabaseConnection } from "./ServiceDatabase.Connection";

@Module({
  imports: [ConfigModule],
  providers: [DatabaseConnection, ServiceDatabaseConnection],
  exports: [DatabaseConnection],
})
export class DatabaseModule {}

export default DatabaseModule;
