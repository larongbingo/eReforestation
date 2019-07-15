import { UserPermissions } from "../models/IPermissions";

export const IPermissionService = "IPermissionService";
export interface IPermissionService {
  isUserParticipant(userId: string): Promise<boolean>;

  isUserAdmin(userId: string): Promise<boolean>;
  
  isUserSuperUser(userId: string): Promise<boolean>;

  getPermission(userId: string): Promise<UserPermissions>;
}
