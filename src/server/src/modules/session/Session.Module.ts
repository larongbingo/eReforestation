import { Module } from "@nestjs/common";

import { SessionModelServiceProvider } from "./Session.Model.Service";
import { SessionServiceProvider } from "./SessionManager";

@Module({
  providers: [SessionServiceProvider, SessionModelServiceProvider],
  exports: [SessionServiceProvider],
})
export class SessionModule {}
