import { IUser } from "../models/IUser";
import { IUserConfirmDelete } from "../models/IUserConfirmDelete";

export const IUserService = "IUserService";
export interface IUserService {
  findOneByUsername(username: string): Promise<IUser>;
  findOneById(id: string): Promise<IUser>;
  findDeletionConfirmation(confirmationString: string): Promise<IUserConfirmDelete>;
  sendConfirmationOfDeletion(userId: string): Promise<any>;
  createUser(details: IUser): Promise<IUser>;
  destroyUser(userId: string): Promise<boolean>;
  updateUser(userId: string, newDetails: Partial<IUser>): Promise<IUser>;
}
