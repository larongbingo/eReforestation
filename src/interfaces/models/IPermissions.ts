
export interface IPermissions {
  userId?: string;
  permission: UserPermissions;
}

export enum UserPermissions {

  /**
   * This is the basic user access given
   * They can only join events
   */
  Participant = "Participant",
  
  /**
   * They are allowed to create news and events
   */
  Admin = "Admin",

  /**
   * They can do the previous permissions
   * But they are also allowed to assign other roles to 
   * other users
   */
  Superuser = "Superuser",
}
