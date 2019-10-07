
/**
 * The personal details of the user
 */
export interface IUserDetails {

  /**
   * The id of the user
   */
  userId?: string;

  /**
   * The first name of the user
   */
  firstName: string;

  /**
   * The middle name of the user
   */
  middleName: string;

  /**
   * The last name of the user
   */
  lastName: string;

  /**
   * Date of Birth of the user
   */
  dateOfBirth: Date;

  /**
   * The address of the user
   * The column length should be atleast 500
   */
  address: string;

  /**
   * The phone number of the user
   */
  phoneNumber: string;

  /**
   * The email address of the user
   */
  emailAddress: string;

}
