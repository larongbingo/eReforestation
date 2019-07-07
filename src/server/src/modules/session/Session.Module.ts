import { Module } from "@nestjs/common";

import { UserModule } from "../user/user.module";

import { SessionManagerProvider, SessionValidatorProvider } from "./SessionManager";

@Module({
  imports: [UserModule],
  providers: [SessionManagerProvider, SessionValidatorProvider],
  exports: [SessionManagerProvider, SessionValidatorProvider],
})
export class SessionModule {}
