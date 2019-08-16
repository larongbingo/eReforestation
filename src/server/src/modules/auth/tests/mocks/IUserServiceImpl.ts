import { IUserService } from "../../../../../../interfaces/services/IUserService";
import { IUser } from "../../../../../../interfaces/models/IUser";
import { IAuthenticatedUsersArray } from "../constants/IAuthenticatedUsersArray";
import { IUserConfirmDelete } from "../../../../../../interfaces/models/IUserConfirmDelete";

export class IUserServiceImpl implements IUserService {
  restoreUser(userId: string): Promise<IUser> {
    throw new Error("Method not implemented.");
  }
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

  public async createUser(details: IUser): Promise<IUser> {
    throw new Error("Method not implemented.");
  }

  public async destroyUser(userId: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  public async updateUser(userId: string, newDetails: Partial<IUser>): Promise<IUser> {
    throw new Error("Method not implemented.");
  }

  findDeletionConfirmation(confirmationString: string): Promise<IUserConfirmDelete> {
    throw new Error("Method not implemented.");
  }

  sendConfirmationOfDeletion(userId: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

}
