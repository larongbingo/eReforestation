import { IUserService } from "../../../../../../interfaces/services/IUserService";
import { IUser } from "../../../../../../interfaces/models/IUser";
import { IAuthenticatedUsersArray } from "../constants/IAuthenticatedUsersArray";

export class IUserServiceImpl implements IUserService {
  private users: IUser[] = IAuthenticatedUsersArray;

  public async findOneByUsername(username: string): Promise<IUser> {
    let sameUsername = null;

    this.users.forEach(user => {
      if (user.username === username) {
        sameUsername = user;
      }
    });

    return sameUsername;
  }

  public async findOneById(id: string): Promise<IUser> {
    let sameId = null;

    this.users.forEach(user => {
      if (user.id === id) {
        sameId = user;
      }
    });

    return sameId;
  }
}
