
/**
 * Represents reforestation efforts or other events
 */
export interface IEvent {

  /**
   * Unique Identifier
   */
  id?: string;

  /**
   * File name of the feature image
   */
  featureImage?: string;

  /**
   * Unique Public Identifier
   */
  title: string;

  /**
   * The place the event will take place or the meetup location of the event
   */
  location: string;

  /**
   * The date and time the event will take place
   */
  date: Date;

  /**
   * A description of the event
   */
  description: string;

  /**
   * Dictates whether the event is all green, finished or cancelled
   */
  status: EventStatus | string;
}

/**
 * Dictates if the event is go, cancelled or postponed
 * Finished status is if its Go and its past the date its supposed to start
 */
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
