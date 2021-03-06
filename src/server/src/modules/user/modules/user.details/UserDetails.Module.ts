import { Module } from "@nestjs/common";

import { UserDetailsController } from "./UserDetails.Controller";
import { UserDetailsServiceProvider } from "./UserDetails.Service";

@Module({
  controllers: [UserDetailsController],
  providers: [UserDetailsServiceProvider],
  exports: [UserDetailsServiceProvider],
})
export class UserDetailsModule {}
