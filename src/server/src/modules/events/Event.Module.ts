import { Module, forwardRef } from "@nestjs/common";

import { PermissionModule } from "../permissions/Permission.Module";
import { TextsModule } from "../texts/Texts.Module";
import { GalleryModule } from "../gallery/Gallery.Module";

import { EventParticipationModule } from "./modules/eventParticipants/EventParticipants.Module";
import { EventController } from "./Event.Controller";
import { EventServiceProvider } from "./Event.Service";

@Module({
  imports: [PermissionModule, forwardRef(() => EventParticipationModule), TextsModule, GalleryModule],
  controllers: [EventController],
  providers: [EventServiceProvider],
  exports: [EventServiceProvider],
})
export class EventModule {}
