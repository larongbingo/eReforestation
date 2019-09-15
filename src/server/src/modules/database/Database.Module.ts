import { Module, OnModuleDestroy, OnApplicationShutdown } from "@nestjs/common";
import { DatabaseConnectionConfig } from "./DatabaseConnectionConfig";
import { DatabaseConnectionProvider, DatabaseConnection } from "./DatabaseConnection";
import { ServiceDatabaseConnectionProvider, ServiceDatabaseConnection } from "./ServiceDatabase.Connection";

@Module({
  providers: [DatabaseConnectionConfig, DatabaseConnectionProvider, ServiceDatabaseConnectionProvider],
  exports: [DatabaseConnectionProvider],
})
export class DatabaseModule implements OnModuleDestroy, OnApplicationShutdown {

  public async onApplicationShutdown(signal?: string) {
    await this.closeDatabaseConnection();
  }

  public async onModuleDestroy() {
    await this.closeDatabaseConnection();
  }

  private async closeDatabaseConnection() {
    await ServiceDatabaseConnection.close();
    return DatabaseConnection.close();
  }

}

export default DatabaseModule;
