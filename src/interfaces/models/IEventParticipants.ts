
export interface IEventParticipants {
  /**
   * Can be used as a confirmation id
   */
  id?: string;
  userId: string;
  eventId: string;
  confirmed: boolean;
  
}
