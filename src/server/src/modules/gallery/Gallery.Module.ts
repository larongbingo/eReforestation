import { Module } from "@nestjs/common";

import { PermissionModule } from "../permissions/Permission.Module";

import { GalleryController } from "./Gallery.Controller";
import { GalleryServiceProvider } from "./Gallery.Service";

@Module({
  imports: [PermissionModule],
  providers: [GalleryServiceProvider],
  controllers: [GalleryController],
})
export class GalleryModule {}
