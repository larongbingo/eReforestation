import { Module } from "@nestjs/common";

import { ConfigModule } from "../config/Config.Module";

import { SessionModelServiceProvider } from "./Session.Model.Service";
import { SessionServiceProvider } from "./SessionManager";

@Module({
  imports: [ConfigModule],
  providers: [SessionServiceProvider, SessionModelServiceProvider],
  exports: [SessionServiceProvider],
})
export class SessionModule {}
