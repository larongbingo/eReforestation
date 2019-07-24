import { Injectable, Provider } from "@nestjs/common";
import { createTransport } from "nodemailer";

import { IMailService, IMail } from "../../../../interfaces/services/IMailService";

@Injectable()
export class MailService implements IMailService {
  constructor() {
    if (this.isMailVariablesSet()) {
      throw new Error("Credentials for email is missing, please make sure that" +
      " the MAIL_EMAIL, MAIL_USERNAME, MAIL_PORT and MAIL_PASSWORD is set");
    }
  }

  private readonly isMailVariablesSet = () => {
    return !process.env.MAIL_PASSWORD ||
    !process.env.MAIL_USERNAME ||
    !process.env.MAIL_SMTP ||
    !process.env.MAIL_PORT;
  }

  private readonly transporter = createTransport({
    host: process.env.MAIL_SMTP,
    port: Number(process.env.MAIL_PORT),
    secure: true,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  public async sendMail(mail: IMail): Promise<any> {
    const info = await this.transporter.sendMail({
      from: process.env.MAIL_USERNAME,
      to: mail.to,
      subject: mail.title,
      html: mail.message,
    });

    return info;
  }
}

export const MailServiceProvider: Provider<MailService> = {
  provide: IMailService,
  useClass: MailService,
};
