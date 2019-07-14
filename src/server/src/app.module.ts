import { Module } from "@nestjs/common";

import { DatabaseModule } from "./modules/database/Database.Module";
import { AuthModule } from "./modules/auth/Auth.Module";
import { SessionModule } from "./modules/session/Session.Module";
import { UserModule } from "./modules/user/User.Module";

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    SessionModule,
    UserModule,
  ],
})
export class AppModule {}
