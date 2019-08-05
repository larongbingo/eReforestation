import { IEvent } from "../models/IEvent";

export const IEventService = "IEventService";
export interface IEventService {
  findOneById(id: string): Promise<IEvent>;
  createEvent(eventDetails: IEvent): Promise<IEvent>;
  updateEvent(newEventDetails: Partial<IEvent>, id: string): Promise<IEvent>;
  getEvents(): Promise<IEvent[]>;
}
