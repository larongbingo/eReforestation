import { Module } from "@nestjs/common";

import { UserModule } from "../user/User.Module";

import { SessionServiceProvider } from "./SessionManager";

@Module({
  providers: [SessionServiceProvider],
  exports: [SessionServiceProvider],
})
export class SessionModule {}
