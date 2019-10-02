import { TerminusModule } from "@nestjs/terminus";
import { Module } from "@nestjs/common";

import { DatabaseModule } from "../database/Database.Module";
import { TextsModule } from "../texts/Texts.Module";

import { TerminusOptionsService } from "./Terminus-Health.Service";
import { MySQLConnectionHealthIndicator } from "./MySQLConnection.Health";

@Module({
  imports: [
    TerminusModule.forRootAsync({
      imports: [HealthModule],
      useClass: TerminusOptionsService,
    }),
    DatabaseModule,
    TextsModule,
  ],
  providers: [MySQLConnectionHealthIndicator],
  exports: [MySQLConnectionHealthIndicator],
})
export class HealthModule {}
