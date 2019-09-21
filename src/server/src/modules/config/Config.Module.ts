import { Module, Logger } from "@nestjs/common";
import { existsSync } from "fs";

import { MailServiceConfig } from "./configs/mail/Mail.Service.Config";
import { DatabaseConnectionConfig } from "./configs/database/DatabaseConnectionConfig";
import { ServiceDatabaseConfig } from "./configs/database/ServiceDatabase.Config";
import { ProcessConfigServiceProvider } from "./Process.Config.Service";
import { EnvConfigServiceProvider } from "./Env.Config.Service";

const FILE_NAME = `${process.env.NODE_ENV || "development"}.env`;
let ConfigProvider = EnvConfigServiceProvider;

export async function checkEnvFile() {
  if (existsSync(FILE_NAME)) {
    Logger.log(`File ${FILE_NAME} exists`)
  } else {
    Logger.log(`File ${FILE_NAME} does not exist`);
    ConfigProvider = ProcessConfigServiceProvider;
  }
}

@Module({
  providers: [
    ConfigProvider,
    DatabaseConnectionConfig,
    ServiceDatabaseConfig,
    MailServiceConfig,
  ],
  exports: [
    ConfigProvider,
    DatabaseConnectionConfig,
    ServiceDatabaseConfig,
    MailServiceConfig,
  ],
})

export class ConfigModule {}
