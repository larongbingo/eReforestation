
/**
 * The details of the Emergency Contact Person
 */
export interface IContactPerson {

  /**
   * Foreign Key to User Table/Model
   */
  userId?: string

  /**
   * The first name of the Emergency Contact Person
   */
  firstName: string;

  /**
   * The middle name of the Emergency Contact Person
   */
  middleName: string;

  /**
   * The last name of the Emergency Contact Person
   */
  lastName: string;

  /**
   * The address of the Emergency Contact Person
   */
  address: string;

  /**
   * The phone number of the Emergency Contact Person
   */
  phoneNumber: string;

  /**
   * The email address of the Emergency Contact Person
   */
  emailAddress: string;

}
