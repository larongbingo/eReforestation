
/**
 * An action done by a user; also interpreted as a log entry
 */
export interface ILog {

  /**
   * Unique Identifier
   */
  id?: string;

  /**
   * The event name
   */
  event: string;

  /**
   * The description of the action
   */
  description: string;

  /**
   * Optional parameters when the action was done
   */
  params?: string;

  createdAt?: number;

}
