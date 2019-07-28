import { Injectable, BadRequestException, Provider } from "@nestjs/common";

import { IContactPersonService } from "../../../../../../interfaces/services/IContactPersonService";
import { IContactPerson } from "../../../../../../interfaces/models/IContactPerson";
import { ContactPerson } from "../../../database/models/ContactPerson.Model";

@Injectable()
export class ContactPersonService implements IContactPersonService {

  private sanitizeContactPerson: (details: ContactPerson) => IContactPerson = (details) => ({
    firstName: details.firstName,
    middleName: details.middleName,
    lastName: details.lastName,
    address: details.address,
    phoneNumber: details.phoneNumber,
    emailAddress: details.emailAddress,
  });

  public async getContactPerson(id: string): Promise<IContactPerson> {
    const contactPerson = await ContactPerson.findOne({where: {userId: id}});
    if (!contactPerson) { throw new BadRequestException("Please fill up your contact person form"); }
    return this.sanitizeContactPerson(contactPerson);
  }

  public async createContactPerson(personDetails: IContactPerson, id: string): Promise<IContactPerson> {
    if (await ContactPerson.findOne({where: {userId: id}})) { 
      throw new BadRequestException("An existing contact person details is already present"); 
    }
    const contactPerson = await ContactPerson.create({id, ...personDetails});
    return this.sanitizeContactPerson(contactPerson);
  }

  public async updateContactPerson(personDetails: IContactPerson, id: string): Promise<IContactPerson> {
    const contactPerson = await ContactPerson.findOne({where: {userId: id}});
    if (!contactPerson) { throw new BadRequestException("Please fill up your contact person form"); }
    return this.sanitizeContactPerson(contactPerson);
  }
}

export const ContactPersonServiceProvider: Provider<ContactPersonService> = {
  provide: IContactPersonService,
  useClass: ContactPersonService,
};
