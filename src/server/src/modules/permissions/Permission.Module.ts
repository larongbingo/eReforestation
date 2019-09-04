import { Module } from "@nestjs/common";

import { PermissionServiceProvider } from "./Permission.Service";
import { PermissionController } from "./Permission.Controller";

@Module({
  imports: [],
  controllers: [PermissionController],
  providers: [PermissionServiceProvider],
  exports: [PermissionServiceProvider]
})
export class PermissionModule {}
