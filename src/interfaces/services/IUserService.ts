import { IUser } from "../models/IUser";

export const IUserService = "IUserService";
export interface IUserService {
  findOneByUsername(username: string): Promise<IUser>;
  findOneById(id: string): Promise<IUser>;
  createUser(details: IUser): Promise<IUser>;
  destroyUser(userId: string): Promise<boolean>;
  updateUser(userId: string, newDetails: Partial<IUser>): Promise<IUser>;
}
