import { Injectable, Provider, Inject } from "@nestjs/common";
import { Op } from "sequelize";

import { IEventService } from "../../../../../../interfaces/services/IEventService";
import { IEventParticipants } from "../../../../../../interfaces/models/IEventParticipants";
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

  public async findOneById(confirmationId: string): Promise<IEventParticipants> {
    return EventParticipants.findOne({where: {id: confirmationId}});
  }

  public async updateOneById(
    confirmationId: string,
    newDetails: Partial<IEventParticipants>,
  ): Promise<IEventParticipants> {
    const eventParticipation = await EventParticipants.findOne({where: {id: confirmationId}});
    if (!eventParticipation) { throw new Error("The given confirmation id is invalid"); }
    Object.keys(newDetails).forEach(key => eventParticipation[key] = newDetails[key]);
    return eventParticipation.save();
  }
}

export const EventPartcipationServiceProvider: Provider = {
  provide: IEventParticipantsService,
  useClass: EventPartcipationService,
};
