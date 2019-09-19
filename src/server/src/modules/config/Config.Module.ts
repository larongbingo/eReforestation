import { Module } from "@nestjs/common";
import { createReadStream } from "fs";

import { DatabaseConnectionConfig } from "./configs/database/DatabaseConnectionConfig";
import { ServiceDatabaseConfig } from "./configs/database/ServiceDatabase.Config";
import { ProcessConfigServiceProvider } from "./Process.Config.Service";
import { EnvConfigServiceProvider } from "./Env.Config.Service";

let IS_ENV_FILE_PRESENT = false;

export function checkEnvFile() {
  try {
    createReadStream(`${process.env.NODE_ENV || "development"}.env`);
  } catch (err) {
    IS_ENV_FILE_PRESENT = true;
  }

  IS_ENV_FILE_PRESENT = false;
}

const ConfigProvider = IS_ENV_FILE_PRESENT ? EnvConfigServiceProvider : ProcessConfigServiceProvider;

@Module({
  providers: [
    ConfigProvider,
    DatabaseConnectionConfig,
    ServiceDatabaseConfig,
  ],
  exports: [ConfigProvider],
})

export class ConfigModule {}
