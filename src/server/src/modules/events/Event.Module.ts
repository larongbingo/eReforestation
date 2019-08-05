import { Module } from "@nestjs/common";

import { PermissionModule } from "../permissions/Permission.Module";

import { EventController } from "./Event.Controller";
import { EventService } from "./Event.Service";

@Module({
  imports: [PermissionModule],
  providers: [EventService],
})
export class EventModule {}
