import { Module } from "@nestjs/common";

import { PermissionModule } from "../permissions/Permission.Module";
import { LogModule } from "../log/Log.Module";

import { AdminModule } from "./modules/admin/Admin.Module";
import { SuperUserController } from "./SuperUser.Controller";
import { SuperUserServiceProvider } from "./SuperUser.Service";
import { BackupController } from "./Backup.Controller";
import { BackupServiceProvider } from "./Backup.Service";
import { ConfigModule } from "../config/Config.Module";

@Module({
  imports: [
    AdminModule,
    ConfigModule,
    LogModule,
    PermissionModule,
  ],
  controllers: [SuperUserController, BackupController],
  providers: [SuperUserServiceProvider, BackupServiceProvider],
})
export class SuperUserModule {}
