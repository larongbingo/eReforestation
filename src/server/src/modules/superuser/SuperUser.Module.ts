import { Module } from "@nestjs/common";

import { PermissionModule } from "../permissions/Permission.Module";
import { LogModule } from "../log/Log.Module";

import { AdminModule } from "./modules/admin/Admin.Module";

@Module({
  imports: [
    AdminModule,
    LogModule,
    PermissionModule,
  ],
})
export class SuperUserModule {}
