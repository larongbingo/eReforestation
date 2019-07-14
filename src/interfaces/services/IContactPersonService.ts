import { IContactPerson } from "../models/IContactPerson";

export const IContactPersonService = "IContactPersonService";
export interface IContactPersonService {
  getContactPerson(id: string): Promise<IContactPerson>;
  createContactPerson(personDetails: IContactPerson, id: string): Promise<IContactPerson | null>;
  updateContactPerson(personDetails: Partial<IContactPerson>, id: string): Promise<IContactPerson | null>;
}
