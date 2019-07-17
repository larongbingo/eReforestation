import { Module } from "@nestjs/common";

import { ContactPersonModule } from "./modules/contact.person/ContactPerson.Module";
import { UserDetailsModule } from "./modules/user.details/UserDetails.Module";
import { UserServiceProvider } from "./User.Service";

@Module({
  imports: [
    ContactPersonModule,
    UserDetailsModule,
  ],
  providers: [
    UserServiceProvider,
  ],
  exports: [
    UserServiceProvider,
  ],
})
export class UserModule {}
