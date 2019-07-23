import { Injectable, Provider } from "@nestjs/common";

import { IUserDetailsService } from "../../../../../../interfaces/services/IUserDetailsService";
import { IUserDetails } from "../../../../../../interfaces/models/IUserDetails";
import { UserDetails } from "../../../database/models/UserDetails.Model";

@Injectable()
export class UserDetailsService implements IUserDetailsService {
  private sanitizeUserDetails: (userDetailsInstance: UserDetails) => IUserDetails = (userDetailsInstance: UserDetails) => {
    return {
      firstName: userDetailsInstance.firstName,
      middleName: userDetailsInstance.middleName,
      lastName: userDetailsInstance.lastName,
      dateOfBirth: userDetailsInstance.dateOfBirth,
      address: userDetailsInstance.address,
      phoneNumber: userDetailsInstance.phoneNumber,
      emailAddress: userDetailsInstance.emailAddress,
    };
  }

  public async getDetails(id: string): Promise<IUserDetails> {
    const userDetails =  await UserDetails.findOne({where: {id}});
    const sanitizedUserDetails: IUserDetails = this.sanitizeUserDetails(userDetails);
    return sanitizedUserDetails;
  }

  public async updateDetails(newDetails: Partial<IUserDetails>, id: string): Promise<IUserDetails> {
    const userDetailsInstance = await UserDetails.findOne({where: {id}});
    for (const newDetailsKey in newDetails) {
      if (newDetailsKey) {
        userDetailsInstance[newDetailsKey] = newDetails[newDetailsKey];
      }
    }
    userDetailsInstance.save();
    const sanitizedUserDetails: IUserDetails = this.sanitizeUserDetails(userDetailsInstance);
    return sanitizedUserDetails;
  }

  public async createDetails(newDetails: IUserDetails, id: string): Promise<IUserDetails> {
    const newUserDetailsInstance = await UserDetails.create(newDetails);
    const sanitizedUserDetails = this.sanitizeUserDetails(newUserDetailsInstance);
    return sanitizedUserDetails;
  }
}

export const UserDetailsServiceProvider: Provider<UserDetailsService> = {
  provide: IUserDetailsService,
  useClass: UserDetailsService,
};
