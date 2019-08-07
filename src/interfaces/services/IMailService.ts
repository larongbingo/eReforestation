
export const IMailService = "IMailService";
export interface IMailService {
  sendMail(mail: IMail): Promise<any>;
}

export const IContactRetrievalService = "IContactRetrievalService";
export interface IContactRetrievalService {
  retrieveContacts(userId: string): Promise<IContact>;
}

export interface IMail {
  to: string;
  title: string;
  message: string;
}

export interface IContact {
  emailAddress: string; 
  phoneNumber: string;
}
