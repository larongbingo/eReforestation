import { Module } from "@nestjs/common";

import { MailModule } from "../mail/Mail.Module";
import { PermissionModule } from "../permissions/Permission.Module";
import { TextsModule } from "../texts/Texts.Module";

import { ContactPersonModule } from "./modules/contact.person/ContactPerson.Module";
import { UserDetailsModule } from "./modules/user.details/UserDetails.Module";
import { UserContoller } from "./User.Controller";
import { UserServiceProvider } from "./User.Service";

@Module({
  imports: [
    ContactPersonModule,
    UserDetailsModule,
    MailModule,
    PermissionModule,
    TextsModule,
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
