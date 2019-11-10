import { Module, forwardRef } from "@nestjs/common";

import { EventModule } from "../../Event.Module";

import { EventParticipantsQueriesController } from "./EventParticipantsQueries.Controller";
import { EventParticipantsController } from "./EventParticipants.Controller";
import { EventPartcipationServiceProvider } from "./EventParticipants.Service";

@Module({
  imports: [forwardRef(() => EventModule)],
  controllers: [EventParticipantsController, EventParticipantsQueriesController],
  providers: [EventPartcipationServiceProvider],
  exports: [EventPartcipationServiceProvider],
})
export class EventParticipationModule {}
