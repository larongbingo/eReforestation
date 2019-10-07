
/**
 * Represents a ticket of the event
 */
export interface IEventParticipants {

  /**
   * Can be used as a confirmation id
   */
  id?: string;

  /**
   * The id of the participating user
   */
  userId: string;

  /**
   * The id of the event the user wants to participate
   */
  eventId: string;

  /**
   * Confirmation from the admin that the request to join the event is allowed
   */
  confirmed: boolean;
  
}
