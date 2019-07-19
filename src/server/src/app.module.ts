import { Module, ValidationPipe } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";

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
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
