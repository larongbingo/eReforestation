import { Module, forwardRef } from "@nestjs/common";

import { EventModule } from "../../Event.Module";

import { EventParticipantsController } from "./EventParticipants.Controller";
import { EventPartcipationServiceProvider } from "./EventParticipants.Service";

@Module({
  imports: [forwardRef(() => EventModule)],
  controllers: [EventParticipantsController],
  providers: [EventPartcipationServiceProvider],
  exports: [EventPartcipationServiceProvider],
})
export class EventParticipationModule {}
