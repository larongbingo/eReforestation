import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  AllowNull,
} from "sequelize-typescript";

import { IUserDetails } from "../../../../../interfaces/models/IUserDetails";
import { User } from "./User.Model";

@Table({
  tableName: "userDetails",
  paranoid: true,
  timestamps: true,
})
export class UserDetails extends Model<UserDetails> implements IUserDetails {
  @ForeignKey(() => User)
  @Column(DataType.STRING)
  userId?: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  firstName: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  middleName: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  lastName: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  dateOfBirth: Date;

  @AllowNull(false)
  @Column(DataType.STRING)
  address: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  phoneNumber: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  emailAddress: string;
}
