import { Injectable, Provider, Inject } from "@nestjs/common";

import { IContactRetrievalService, IContact } from "../../../../interfaces/services/IMailService";
import { IUserDetailsService } from "../../../../interfaces/services/IUserDetailsService";

@Injectable()
export class ContactRetrievalService implements IContactRetrievalService {

  constructor(
    @Inject(IUserDetailsService) private readonly userDetailsService: IUserDetailsService,
  ) {}

  public async retrieveContacts(userId: string): Promise<IContact> {
    return this.userDetailsService.getDetails(userId);
  }

}

export const ContactRetrievalServiceProvider: Provider = {
  provide: IContactRetrievalService,
  useClass: ContactRetrievalService,
};
