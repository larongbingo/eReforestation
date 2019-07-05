
export interface IUser {
  userId?: string;

  firstName: string;
  middleName: string;
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

  phoneNumber: string;
  emailAddress: string;
}
