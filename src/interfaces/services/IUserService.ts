import { IUser } from "../models/IUser";

export const IUserService = "IUserService";
export interface IUserService {
  findOneByUsername(username: string): Promise<IUser>;
  findOneById(id: string): Promise<IUser>;
}
