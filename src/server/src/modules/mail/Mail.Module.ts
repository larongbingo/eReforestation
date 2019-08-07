import { Module } from "@nestjs/common";

import { UserDetailsModule } from "../user/modules/user.details/UserDetails.Module";

import { MailServiceProvider } from "./Mail.Service";
import { ContactRetrievalServiceProvider } from "./ContactRetrieval.Service";

@Module({
  imports: [UserDetailsModule],
  providers: [MailServiceProvider, ContactRetrievalServiceProvider],
  exports: [MailServiceProvider, ContactRetrievalServiceProvider],
})
export class MailModule {}
