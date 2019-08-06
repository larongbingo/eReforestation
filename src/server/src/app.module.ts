import { Module, ValidationPipe } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";

import { DatabaseModule } from "./modules/database/Database.Module";
import { AuthModule } from "./modules/auth/Auth.Module";
import { SessionModule } from "./modules/session/Session.Module";
import { UserModule } from "./modules/user/User.Module";
import { NewsModule } from "./modules/news/News.Module";
import { EventModule } from "./modules/events/Event.Module";
import { HealthModule } from "./modules/health/Health.Module";

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    SessionModule,
    UserModule,
    NewsModule,
    EventModule,
    HealthModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
