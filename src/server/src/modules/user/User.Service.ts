import { Injectable, Provider } from "@nestjs/common";

import { IUserService } from "../../../../interfaces/services/IUserService";
import { IUser } from "../../../../interfaces/models/IUser";
import { User } from "../database/models/User.Model";

@Injectable()
export class UserService implements IUserService {
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
