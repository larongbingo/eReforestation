import { Module, Logger } from "@nestjs/common";
import { existsSync } from "fs";

import { MailServiceConfig } from "./configs/mail/Mail.Service.Config";
import { DatabaseConnectionConfig } from "./configs/database/DatabaseConnectionConfig";
import { ServiceDatabaseConfig } from "./configs/database/ServiceDatabase.Config";
import { ProcessConfigServiceProvider } from "./Process.Config.Service";
import { EnvConfigServiceProvider } from "./Env.Config.Service";

const FILE_NAME = `${process.env.NODE_ENV || "development"}.env`;
const ConfigSource = checkEnvFile();

export function checkEnvFile() {
  if (existsSync(FILE_NAME)) {
    Logger.log(`File ${FILE_NAME} exists`);
    return EnvConfigServiceProvider;
  } else {
    Logger.log(`File ${FILE_NAME} does not exist`);
    return ProcessConfigServiceProvider;
  }
}

@Module({
  providers: [
    ConfigSource,
    DatabaseConnectionConfig,
    ServiceDatabaseConfig,
    MailServiceConfig,
  ],
  exports: [
    ConfigSource,
    DatabaseConnectionConfig,
    ServiceDatabaseConfig,
    MailServiceConfig,
  ],
})

export class ConfigModule {}
