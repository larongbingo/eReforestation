import { IUser } from "../models/IUser";

export const IUserListService = "IUserList";
export interface IUserListService {
  getUserList(): Promise<IUser[]>;
  getUserListByEventId(eventId: string): Promise<IUser[]>;
}
