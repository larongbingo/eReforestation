import { Module } from "@nestjs/common";

import { PermissionServiceProvider } from "./Permission.Service";

@Module({
  imports: [],
  providers: [PermissionServiceProvider],
  exports: [PermissionServiceProvider]
})
export class PermissionModule {}
