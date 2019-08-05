import { Module, forwardRef } from "@nestjs/common";

import { PermissionModule } from "../permissions/Permission.Module";

import { EventParticipationModule } from "./modules/eventParticipants/EventParticipants.Module";
import { EventController } from "./Event.Controller";
import { EventService } from "./Event.Service";

@Module({
  imports: [PermissionModule, forwardRef(() => EventParticipationModule)],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
