import { Module } from "@nestjs/common";

import { PermissionModule } from "../permissions/Permission.Module";
import { TextsModule } from "../texts/Texts.Module";

import { GalleryController } from "./Gallery.Controller";
import { GalleryServiceProvider } from "./Gallery.Service";

@Module({
  imports: [PermissionModule, TextsModule],
  providers: [GalleryServiceProvider],
  controllers: [GalleryController],
  exports: [GalleryServiceProvider],
})
export class GalleryModule {}
