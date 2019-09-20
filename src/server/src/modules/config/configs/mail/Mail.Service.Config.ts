import { Injectable, Inject } from "@nestjs/common";

import { IConfigService } from "../../../../../../interfaces/services/IConfigService";

@Injectable()
export class MailServiceConfig {

  constructor(
    @Inject(IConfigService) private readonly envConfig: IConfigService,
  ) {
    this.MAIL_USERNAME = this.envConfig.get(MAIL_CONFIG_ENV.USERNAME);

    this.MAIL_PASSWORD = this.envConfig.get(MAIL_CONFIG_ENV.PASSWORD);

    this.MAIL_SMTP = this.envConfig.get(MAIL_CONFIG_ENV.SMTP);

    this.MAIL_PORT = this.envConfig.get(MAIL_CONFIG_ENV.PORT);

    if (
      !(
        this.MAIL_PASSWORD ||
        this.MAIL_USERNAME ||
        this.MAIL_PORT ||
        this.MAIL_SMTP
      )
    ) {
      throw new Error("Credentials for email is missing, please make sure that" +
      " the MAIL_SMTP, MAIL_USERNAME, MAIL_PORT and MAIL_PASSWORD is set");
    }

  }

  public MAIL_USERNAME: string;
  public MAIL_PASSWORD: string;
  public MAIL_SMTP: string;
  public MAIL_PORT: string;

}

export const MAIL_CONFIG_ENV = {
  USERNAME: "MAIL_USERNAME",
  PASSWORD: "MAIL_PASSWORD",
  SMTP: "MAIL_SMTP",
  PORT: "MAIL_PORT",
};
