import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  AllowNull,
} from "sequelize-typescript";

import { IContactPerson } from "../../../../../interfaces/models/IContactPerson";

import { User } from "./User.Model";

@Table({
  tableName: "contactPeople",
  paranoid: true,
  timestamps: true,
})
export class ContactPerson extends Model<ContactPerson>
  implements IContactPerson {
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
  address: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  phoneNumber: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  emailAddress: string;
}

export default ContactPerson;
