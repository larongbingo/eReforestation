import { IEventParticipants } from "../models/IEventParticipants";

export const IAdminService = "IAdminService";
export interface IAdminService {
  // Confirm Participants application for joining an event
  confirmParticipantApplication(adminId: string, confirmationId: string): Promise<IEventParticipants>;
  
  // Revoke Participants already confirmed to join
  revokeParticipantApplication(adminId: string, confirmationId: string): Promise<IEventParticipants>;

  // Ban Participants with a given reason
  banUser(adminId: string, userId: string, reason: string): Promise<void>;

  // Unban Participants
  unbanUser(adminId: string, userId: string): Promise<void>;
}

export const IAdminMailingService = "IAdminMailingService";
export interface IAdminMailingService {

  mailUserOnSuccessfulApplication(userId: string): Promise<void>;
  
  mailUserOnFailedApplication(userId: string): Promise<void>;
  
  mailUserOnBan(userId: string): Promise<void>;
  
  mailUserOnUnban(userId: string): Promise<void>;

}
