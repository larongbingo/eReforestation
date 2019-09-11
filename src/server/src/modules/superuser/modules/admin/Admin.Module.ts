import { Module } from "@nestjs/common";

import { PermissionModule } from "../../../permissions/Permission.Module";
import { EventParticipationModule } from "../../../events/modules/eventParticipants/EventParticipants.Module";
import { MailModule } from "../../../mail/Mail.Module";
import { UserDetailsModule } from "../../../user/modules/user.details/UserDetails.Module";
import { UserModule } from "../../../user/User.Module";

import { AdminController } from "./Admin.Controller";
import { AdminServiceProvider } from "./Admin.Service";
import { AdminMailingServiceProvider } from "./AdminMailing.Service";
import { UserListController } from "./UserList.Controller";
import { UserListServiceProvider } from "./UserList.Service";

@Module({
  imports: [
    PermissionModule,
    EventParticipationModule,
    MailModule,
    UserDetailsModule,
    UserModule,
  ],
  providers: [AdminServiceProvider, AdminMailingServiceProvider, UserListServiceProvider],
  controllers: [AdminController, UserListController],
  exports: [AdminServiceProvider],
})
export class AdminModule {}
