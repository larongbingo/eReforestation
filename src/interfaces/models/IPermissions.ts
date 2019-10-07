
/**
 * The allowed content for each user
 */
export interface IPermissions {

  /**
   * The id of the user
   */
  userId?: string;

  /**
   * The permission they have
   */
  permission: UserPermissions;
}

/**
 * The permissions for all content
 */
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
