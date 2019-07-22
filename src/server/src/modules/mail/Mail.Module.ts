import { Module } from "@nestjs/common";

import { MailServiceProvider } from "./Mail.Service";

@Module({
  providers: [MailServiceProvider],
})
export class MailModule {}
