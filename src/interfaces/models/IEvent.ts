
export interface IEvent {
  id?: string;
  title: string;
  location: string;
  date: Date;
  description: string;
  status: EventStatus | string;
}

export enum EventStatus {
  /**
   * The event is all green, it will continue and will happen
   */
  Go = "Go",

  /**
   * The event has been cancelled and will no longer happen
   */
  Cancelled = "Cancelled",

  /**
   * The event's date is no longer possible and must be moved to a new date
   */
  Postponed = "Postponed",
}
