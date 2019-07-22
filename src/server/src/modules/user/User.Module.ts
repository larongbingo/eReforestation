import { Module } from "@nestjs/common";

import { MailModule } from "../mail/Mail.Module";

import { ContactPersonModule } from "./modules/contact.person/ContactPerson.Module";
import { UserDetailsModule } from "./modules/user.details/UserDetails.Module";
import { UserContoller } from "./User.Controller";
import { UserServiceProvider } from "./User.Service";

@Module({
  imports: [
    ContactPersonModule,
    UserDetailsModule,
    MailModule,
  ],
  controllers: [
    UserContoller,
  ],
  providers: [
    UserServiceProvider,
  ],
  exports: [
    UserServiceProvider,
  ],
})
export class UserModule {}
