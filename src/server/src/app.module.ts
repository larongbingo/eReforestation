import { Module, ValidationPipe } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";

import { checkEnvFile } from "./modules/config/Config.Module";
import { AppController } from "./app.controller";
import { DatabaseModule } from "./modules/database/Database.Module";
import { AuthModule } from "./modules/auth/auth.module";
import { SessionModule } from "./modules/session/Session.Module";
import { UserModule } from "./modules/user/User.Module";
import { NewsModule } from "./modules/news/News.Module";
import { EventModule } from "./modules/events/Event.Module";
import { HealthModule } from "./modules/health/Health.Module";
import { SuperUserModule } from "./modules/superuser/SuperUser.Module";
import { GalleryModule } from "./modules/gallery/Gallery.Module";

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    SessionModule,
    UserModule,
    NewsModule,
    EventModule,
    HealthModule,
    SuperUserModule,
    GalleryModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
  controllers: [
    AppController,
  ],
})
export class AppModule {

  constructor() {
    (async function() {
      checkEnvFile();
    })();
  }

}
