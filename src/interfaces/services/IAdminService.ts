import { IEventParticipants } from "../models/IEventParticipants";

export const IAdminService = "IAdminService";

/**
 * Actions that an admin have access
 */
export interface IAdminService {
  /**
   * Allows the user to join the event
   * @param adminId The id of the admin that confirms the participation
   * @param confirmationId The confirmation id of the participation
   */
  confirmParticipantApplication(adminId: string, confirmationId: string): Promise<IEventParticipants>;
  
  /**
   * Revokes the user's participation to an event
   * @param adminId The id of the admin that revokes the participation
   * @param confirmationId The confirmation id of the ticket/participation
   */
  revokeParticipantApplication(adminId: string, confirmationId: string): Promise<IEventParticipants>;

  /**
   * Bans a user with a given reason
   * @param adminId The id of the admin that bans the user
   * @param userId The id of the user that needs to be banned
   * @param reason The reason for banning the user
   */
  banUser(adminId: string, userId: string, reason: string): Promise<void>;

  /**
   * Unbans a user
   * @param adminId The id of the admin that unbans the user
   * @param userId The id of the user that unbans the user
   */
  unbanUser(adminId: string, userId: string): Promise<void>;
}

export const IAdminMailingService = "IAdminMailingService";
export interface IAdminMailingService {

  /**
   * Alerts the user they are allowed to join the event indicated by their ticket/participation
   * @param userId The id of the user
   */
  mailUserOnSuccessfulApplication(userId: string): Promise<void>;
  
  /**
   * Alerts the user that they're rejected to join the event
   * @param userId The id of the user
   */
  mailUserOnFailedApplication(userId: string): Promise<void>;
  
  /**
   * Alerts the user that their account is banned
   * @param userId The id of the user
   */
  mailUserOnBan(userId: string): Promise<void>;
  
  /**
   * Alerts the user that their account is unbanned
   * @param userId The id of the user
   */
  mailUserOnUnban(userId: string): Promise<void>;

}
