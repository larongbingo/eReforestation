import { Injectable, Provider, Inject } from "@nestjs/common";

import { ITextsService } from "../../../../interfaces/services/ITextsService";
import { IEventService } from "../../../../interfaces/services/IEventService";
import { IEvent } from "../../../../interfaces/models/IEvent";
import { Event } from "../database/models/Event.Model";
import { TEXTS_KEYS } from "../texts/Texts.Key";

@Injectable()
export class EventService implements IEventService {

  constructor(
    @Inject(ITextsService) private readonly texts: ITextsService,
  ) {}

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
    if (!news) {
      throw new Error(
        this.texts.getText(
          TEXTS_KEYS.EVENT_MISSING_ID_ON_NEWS,
        ),
      );
    }
    return news.update(newEventDetails);
  }
}

export const EventServiceProvider: Provider = {
  provide: IEventService,
  useClass: EventService,
};
