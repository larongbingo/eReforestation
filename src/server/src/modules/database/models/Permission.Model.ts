import { Model, Table, Column, DataType } from "sequelize-typescript";

import { IPermissions, UserPermissions } from "../../../../../interfaces/models/IPermissions";

@Table({
  tableName: "permissions",
  paranoid: true,
})
export class Permission extends Model<Permission> implements IPermissions {
  @Column(DataType.STRING)
  userId?: string;

  @Column(DataType.STRING)
  permission: UserPermissions;
}
