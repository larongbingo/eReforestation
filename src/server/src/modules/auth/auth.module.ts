import { Module } from "@nestjs/common";

import { SessionModule } from "../session/Session.Module";
import { UserModule } from "../user/User.Module";
import { TextsModule } from "../texts/Texts.Module";

import { AuthController } from "./auth.controller";
import { HttpStrategy } from "./http.strategy";
import { CredentialsVerifyProvider, SessionVerifyProvider } from "./auth.service";

@Module({
  imports: [UserModule, SessionModule, TextsModule],
  providers: [HttpStrategy, CredentialsVerifyProvider, SessionVerifyProvider],
  controllers: [AuthController],
})
export class AuthModule {}
