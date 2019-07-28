import { UserPermissions } from "../models/IPermissions";

export const IPermissionService = "IPermissionService";
export interface IPermissionService {
  isUserParticipant(userId: string): Promise<boolean>;

  isUserAdmin(userId: string): Promise<boolean>;
  
  isUserSuperUser(userId: string): Promise<boolean>;

  getPermission(userId: string): Promise<UserPermissions>;

  setParticipantPermission(userId: string): Promise<boolean>;
  
  setAdminPermission(userId: string): Promise<boolean>;
  
  setSuperUserPermission(userId: string): Promise<boolean>;
}
