import { Module } from "@nestjs/common";

import { MailServiceProvider } from "./Mail.Service";

@Module({
  providers: [MailServiceProvider],
  exports: [MailServiceProvider],
})
export class MailModule {}
