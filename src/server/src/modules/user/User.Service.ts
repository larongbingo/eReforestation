import { Injectable, Provider, BadRequestException } from "@nestjs/common";

import { IUserService } from "../../../../interfaces/services/IUserService";
import { IUser } from "../../../../interfaces/models/IUser";
import { User } from "../database/models/User.Model";

@Injectable()
export class UserService implements IUserService {
  public async createUser(details: IUser): Promise<IUser> {
    return await User.create(details);
  }

  public async destroyUser(userId: string): Promise<boolean> {
    const user = await User.findOne({where: {id: userId}});
    if (!user) { return false; }
    await user.destroy();
    return true;
  }

  public async updateUser(userId: string, newDetails: Partial<IUser>): Promise<IUser> {
    const user = await User.findOne({where: {id: userId}});
    if (!user) { throw new BadRequestException("You do not have an account, please create one."); }
    Object.keys(newDetails).forEach(key => user[key] = newDetails[key]);
    return user.save();
  }

  public async findOneById(id: string): Promise<IUser> {
    return await User.findOne({where: {id}});
  }

  public async findOneByUsername(username: string): Promise<IUser> {
    return await User.findOne({where: {username}});
  }
}

export const UserServiceProvider: Provider<UserService> = {
  provide: IUserService,
  useClass: UserService,
};
