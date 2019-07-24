import { Module } from "@nestjs/common";

import { PermissionModule } from "../permissions/Permission.Module";

import { NewsController } from "./News.Controller";
import { NewsService } from "./News.Service";

@Module({
  imports: [
    PermissionModule,
  ],
  providers: [
    NewsService,
  ],
  controllers: [
    NewsController,
  ],
})
export class NewsModule {}
