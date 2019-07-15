import { Module } from "@nestjs/common";

import { PermissionServiceProvider } from "./Permission.Service";

@Module({
  imports: [],
  providers: [PermissionServiceProvider],
})
export class PermissionModule {}
