import { IUser } from "../models/IUser";

export const ICredentialsVerify = "ICredentialsVerify";
export interface ICredentialsVerify {

  /**
   * Checks if there is an account that matches the given
   * credentials
   * @param username The identifier of the account
   * @param password The secret key of the account
   * @returns Returns an IUser object if it matches, null otherwise
   */
  checkCredentials(username: string, password: string): Promise<IUser>;
}

export const ISessionVerify = "ISessionVerify";
export interface ISessionVerify {
  validateUser(token: string): Promise<IUser>;
}
