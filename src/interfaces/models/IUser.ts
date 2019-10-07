
/**
 * The credentials of the user/account
 */
export interface IUser {

  /**
   * The id of the user/account
   */
  id?: string;

  /**
   * The identifier of the account
   */
  username: string;

  /**
   * The secret key of the account
   */
  password: string;

}
