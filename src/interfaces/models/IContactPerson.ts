
export interface IContactPerson {
  /**
   * Foreign Key to User Table/Model
   */
  userId?: string

  firstName: string;
  middleName: string;
  lastName: string;

  address: string;

  phoneNumber: string;
  emailAddress: string;
}
