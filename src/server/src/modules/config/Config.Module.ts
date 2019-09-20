import { Module, Logger } from "@nestjs/common";
import { readFile } from "fs";

import { MailServiceConfig } from "./configs/mail/Mail.Service.Config";
import { DatabaseConnectionConfig } from "./configs/database/DatabaseConnectionConfig";
import { ServiceDatabaseConfig } from "./configs/database/ServiceDatabase.Config";
import { ProcessConfigServiceProvider } from "./Process.Config.Service";
import { EnvConfigServiceProvider } from "./Env.Config.Service";

let IS_ENV_FILE_PRESENT = false;

export async function checkEnvFile() {
  try {
    Logger.log("File does not exist");
    // tslint:disable-next-line: no-empty
    readFile(`${process.env.NODE_ENV || "development"}.env`, () => {});
  } catch (err) {
    IS_ENV_FILE_PRESENT = false;
  }

  IS_ENV_FILE_PRESENT = true;
}

const ConfigProvider = IS_ENV_FILE_PRESENT ? EnvConfigServiceProvider : ProcessConfigServiceProvider;

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
