import { Injectable, Provider, Inject } from "@nestjs/common";
import { Op } from "sequelize";

import { IEventService } from "../../../../../../interfaces/services/IEventService";
import { IEventParticipantsService } from "../../../../../../interfaces/services/IEventParticipantsService";
import { EventParticipants } from "../../../database/models/EventParticipants.Model";

@Injectable()
export class EventPartcipationService implements IEventParticipantsService {
  constructor(
    @Inject(IEventService) private readonly eventService: IEventService,
  ) {}

  public async joinEvent(userId: string, eventId: string): Promise<string> {
    if (!await this.eventService.findOneById(eventId)) { throw new Error("Given event id is invalid"); }

    const participation = await EventParticipants.create({userId, eventId});
    return participation.id;
  }

  public async leaveEvent(userId: string, eventId: string): Promise<void> {
    if (!await this.eventService.findOneById(eventId)) { throw new Error("Given event id is invalid"); }

    const participation = await EventParticipants.findOne({
      where: {
        userId: { [Op.eq]: userId },
        eventId: { [Op.eq]: eventId },
      },
    });

    participation.destroy();
  }
}

export const EventPartcipationServiceProvider: Provider = {
  provide: IEventParticipantsService,
  useClass: EventPartcipationService,
};
