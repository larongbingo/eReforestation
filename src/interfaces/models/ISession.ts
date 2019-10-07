
/**
 * The session string that allows user to do work
 */
export interface ISession {

  /**
   * The id of the user
   */
  userId: string;

  /**
   * The actual session string
   */
  token: string;

  /**
   * The browser they used to login
   */
  userAgent: string;

  /**
   * The ip address of the device they used to login
   */
  ipAddress: string;
}
