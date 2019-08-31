import { Model, Table, Column, DataType } from "sequelize-typescript";

import { ISession } from "../../../../../interfaces/models/ISession";

@Table({
  tableName: "sessions",
  timestamps: true,
})
export class Session extends Model<Session> implements ISession {
  @Column(DataType.STRING)
  userId: string;

  @Column(DataType.TEXT("LONG"))
  token: string;

  @Column(DataType.STRING)
  userAgent: string;

  @Column(DataType.STRING)
  ipAddress: string;
}
