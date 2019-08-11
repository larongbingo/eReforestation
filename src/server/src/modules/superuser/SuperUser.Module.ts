import { Module } from "@nestjs/common";

import { PermissionModule } from "../permissions/Permission.Module";
import { LogModule } from "../log/Log.Module";

import { AdminModule } from "./modules/admin/Admin.Module";
import { SuperUserController } from "./SuperUser.Controller";
import { SuperUserServiceProvider } from "./SuperUser.Service";

@Module({
  imports: [
    AdminModule,
    LogModule,
    PermissionModule,
  ],
  controllers: [SuperUserController],
  providers: [SuperUserServiceProvider],
})
export class SuperUserModule {}
