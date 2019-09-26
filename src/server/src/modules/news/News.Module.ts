import { Module } from "@nestjs/common";

import { PermissionModule } from "../permissions/Permission.Module";
import { TextsModule } from "../texts/Texts.Module";

import { NewsController } from "./News.Controller";
import { NewsServiceProvider } from "./News.Service";

@Module({
  imports: [
    PermissionModule,
    TextsModule,
  ],
  providers: [
    NewsServiceProvider,
  ],
  controllers: [
    NewsController,
  ],
})
export class NewsModule {}
