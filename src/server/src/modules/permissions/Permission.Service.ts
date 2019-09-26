import { Injectable, Provider, Inject } from "@nestjs/common";

import { ITextsService } from "../../../../interfaces/services/ITextsService";
import { IPermissionService } from "../../../../interfaces/services/IPermissionService";
import { UserPermissions } from "../../../../interfaces/models/IPermissions";
import { Permission } from "../database/models/Permission.Model";
import { TEXTS_KEYS } from "../texts/Texts.Key";

@Injectable()
export class PermissionService implements IPermissionService {

  constructor(
    @Inject(ITextsService) private readonly texts: ITextsService,
  ) {}

  public async isUserParticipant(userId: string): Promise<boolean> {
    const assignedPermission = await Permission.findOne({where: {userId}});
    return assignedPermission.permission === UserPermissions.Participant;
  }

  public async isUserAdmin(userId: string): Promise<boolean> {
    const assignedPermission = await Permission.findOne({where: {userId}});
    return assignedPermission.permission === UserPermissions.Admin;
  }

  public async isUserSuperUser(userId: string): Promise<boolean> {
    const assignedPermission = await Permission.findOne({where: {userId}});
    return assignedPermission.permission === UserPermissions.Superuser;
  }

  public async isUserAdminOrSuperUser(userId: string): Promise<boolean> {
    const assignedPermission = await Permission.findOne({where: {userId}});
    const permission = assignedPermission.permission === UserPermissions.Admin ||
    assignedPermission.permission === UserPermissions.Superuser;
    if (!permission) {
      throw new Error(
        this.texts.getText(TEXTS_KEYS.MISSING_ADMIN_OR_SUDO_CREDENTIALS),
      );
    }
    return permission;
  }

  public async getPermission(userId: string): Promise<UserPermissions> {
    const assignedPermission = await Permission.findOne({where: {userId}});
    return assignedPermission.permission;
  }

  public async setParticipantPermission(userId: string): Promise<boolean> {
    const permission = await Permission.create({userId, permission: UserPermissions.Participant});
    return !!permission;
  }

  public async setAdminPermission(userId: string): Promise<boolean> {
    const permission = await Permission.create({userId, permission: UserPermissions.Admin});
    return !!permission;
  }

  public async setSuperUserPermission(userId: string): Promise<boolean> {
    const permission = await Permission.create({userId, permission: UserPermissions.Superuser});
    return !!permission;
  }
}

export const PermissionServiceProvider: Provider<PermissionService> = {
  provide: IPermissionService,
  useClass: PermissionService,
};
