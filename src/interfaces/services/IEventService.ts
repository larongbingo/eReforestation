import { IEvent } from "../models/IEvent";

export const IEventService = "IEventService";
export interface IEventService {
  createEvent(eventDetails: IEvent): Promise<IEvent>;
  updateEvent(newEventDetails: Partial<IEvent>, id: string): Promise<IEvent>;
  getEvents(): Promise<IEvent[]>;
}
