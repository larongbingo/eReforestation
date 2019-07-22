
export const IMailService = "IMailService";
export interface IMailService {
  sendMail(mail: IMail): Promise<any>;
}

export interface IMail {
  to: string;
  title: string;
  message: string;
}
