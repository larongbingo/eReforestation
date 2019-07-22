import { Column, Table, DataType, Model, AllowNull } from "sequelize-typescript";

import { IUserConfirmDelete } from "../../../../../interfaces/models/IUserConfirmDelete";

@Table({
  tableName: "usersConfirmDelete",
  timestamps: true,
})
export class UserConfirmDelete extends Model<UserConfirmDelete> implements IUserConfirmDelete {
  @AllowNull(false)
  @Column(DataType.STRING)
  userId?: string;

  @Column(DataType.STRING)
  confirmationString: string;
}
