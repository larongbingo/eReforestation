import { Module } from "@nestjs/common";

import { PermissionModule } from "../permissions/Permission.Module";
import { TextsModule } from "../texts/Texts.Module";
import { GalleryModule } from "../gallery/Gallery.Module";

import { NewsController } from "./News.Controller";
import { NewsServiceProvider } from "./News.Service";

@Module({
  imports: [
    PermissionModule,
    TextsModule,
    GalleryModule,
  ],
  providers: [
    NewsServiceProvider,
  ],
  controllers: [
    NewsController,
  ],
})
export class NewsModule {}
