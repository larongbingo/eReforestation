import { Injectable, Provider, Inject } from "@nestjs/common";
import { createTransport } from "nodemailer";

import { IMailService, IMail } from "../../../../interfaces/services/IMailService";
import { MailServiceConfig } from "../config/configs/mail/Mail.Service.Config";

@Injectable()
export class MailService implements IMailService {
  constructor(
    @Inject(MailServiceConfig) private readonly mailConfig: MailServiceConfig,
  ) {}

  private readonly transporter = createTransport({
    host: this.mailConfig.MAIL_SMTP,
    port: Number(this.mailConfig.MAIL_PORT),
    secure: true,
    auth: {
      user: this.mailConfig.MAIL_USERNAME,
      pass: this.mailConfig.MAIL_PASSWORD,
    },
  });

  public async sendMail(mail: IMail): Promise<any> {
    const info = await this.transporter.sendMail({
      from: this.mailConfig.MAIL_USERNAME,
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
