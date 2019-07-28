import { Injectable, Provider, BadRequestException, Inject } from "@nestjs/common";
import { generate } from "randomstring";

import { IMailService } from "../../../../interfaces/services/IMailService";
import { IUserConfirmDelete } from "../../../../interfaces/models/IUserConfirmDelete";
import { IUserService } from "../../../../interfaces/services/IUserService";
import { IUser } from "../../../../interfaces/models/IUser";
import { User } from "../database/models/User.Model";
import { UserConfirmDelete } from "../database/models/UserConfirmDelete.Model";
import { IUserDetailsService } from "../../../../interfaces/services/IUserDetailsService";
import { IPermissionService } from "../../../../interfaces/services/IPermissionService";

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(IMailService) private readonly mailService: IMailService,
    @Inject(IUserDetailsService) private readonly userDetailsService: IUserDetailsService,
    @Inject(IPermissionService) private readonly permissionService: IPermissionService,
  ) {}

  public async createUser(details: IUser): Promise<IUser> {
    const user = await await User.create(details);
    this.permissionService.setParticipantPermission(user.id);
    return user;
  }

  public async destroyUser(userId: string): Promise<boolean> {
    const user = await User.findOne({where: {id: userId}});
    if (!user) { return false; }
    await user.destroy();
    UserConfirmDelete.destroy({where: {userId}});
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

  // TODO: Move findDeletionConfirmation to other class
  public async findDeletionConfirmation(confirmationString: string): Promise<IUserConfirmDelete> {
    return UserConfirmDelete.findOne({where: {confirmationString}});
  }

  // TODO: Move sendConfirmationOfDeletion to other class
  // TODO: Refactor sendConfirmationOfDeletion (superman function/method)
  // TODO: Create a config that returns the hostname of the server
  public async sendConfirmationOfDeletion(userId: string): Promise<any> {
    const confirmationString = generate({charset: "alphanumeric", length: 60});
    await UserConfirmDelete.create({userId, confirmationString});

    const userDetails = await this.userDetailsService.getDetails(userId);
    const info = await this.mailService.sendMail({
      to: userDetails.emailAddress,
      title: "Confirmation of Deletion of Account",
      message: `Click here to confirm the deletion of your account localhost:3000/user/?confirm=${confirmationString}`,
    });
    return info;
  }
}

export const UserServiceProvider: Provider<UserService> = {
  provide: IUserService,
  useClass: UserService,
};
