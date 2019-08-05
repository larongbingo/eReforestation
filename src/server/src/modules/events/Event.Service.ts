import { Injectable, Provider } from "@nestjs/common";

import { IEventService } from "../../../../interfaces/services/IEventService";
import { IEvent } from "../../../../interfaces/models/IEvent";
import { Event } from "../database/models/Event.Model";

@Injectable()
export class EventService implements IEventService {
  public async getEvents(): Promise<IEvent[]> {
    return Event.findAll();
  }

  public async findOneById(id: string): Promise<IEvent> {
    return Event.findOne({where: {id}});
  }

  public async createEvent(eventDetails: IEvent): Promise<IEvent> {
    return Event.create(eventDetails);
  }

  public async updateEvent(newEventDetails: Partial<IEvent>, id: string): Promise<IEvent> {
    const news = await Event.findOne({where: {id}});
    if (!news) { throw new Error("Given id does not have any news associated"); }
    return news.update(newEventDetails);
  }
}

export const EventServiceProvider: Provider = {
  provide: IEventService,
  useClass: EventService,
};
