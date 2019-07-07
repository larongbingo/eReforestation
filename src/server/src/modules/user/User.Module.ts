import { Module } from "@nestjs/common";

import { UserServiceProvider } from "./User.Service";

@Module({
  providers: [
    UserServiceProvider,
  ],
  exports: [
    UserServiceProvider,
  ],
})
export class UserModule {}
