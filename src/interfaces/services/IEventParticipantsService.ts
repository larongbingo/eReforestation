
export const IEventParticipantsService = "IEventParticipantsService";
export interface IEventParticipantsService {
  /**
   * Creates a EventParticipant Object
   * @param userId The id of the user
   * @param eventId The id of the event
   * @throws if either of the userId or eventId does not return an object
   */
  joinEvent(userId: string, eventId: string): Promise<string>;
  
  /**
   * Destroys the EventParticipant object
   * @throws eventId does not have any object assigned or eventId is falsy
   */
  leaveEvent(userId: string, eventId: string): Promise<void>;
}
