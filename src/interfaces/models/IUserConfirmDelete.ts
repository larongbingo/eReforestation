
/**
 * Confirmations that the user really wants to delete their account
 */
export interface IUserConfirmDelete {

  /**
   * The id of the user/account that wants to be deleted
   */
  userId?: string;

  /**
   * The confirmation string
   */
  confirmationString: string;
}
