import { Injectable, Provider } from "@nestjs/common";

import { IUserListService } from "../../../../../../interfaces/services/IUserListService";
import { IUser } from "../../../../../../interfaces/models/IUser";
import { UserDetails } from "../../../database/models/UserDetails.Model";
import { User } from "../../../database/models/User.Model";
import { EventParticipants } from "../../../database/models/EventParticipants.Model";

@Injectable()
export class UserListService implements IUserListService {

  public async getUserList(): Promise<IUser[]> {
    return await User.findAll();
  }
  
  public async getUserListByEventId(eventId: string): Promise<IUser[]> {
    const userIds = await EventParticipants.findAll({where: {eventId}});
    const users = [];
    for(const userId of userIds) { users.push(await UserDetails.findOne({where: {userId: userId.userId}})); }
    return users;
  }

}

export const UserListServiceProvider: Provider<UserListService> = {
  provide: IUserListService,
  useClass: UserListService,
};
