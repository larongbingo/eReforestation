import { Model, Table, Column, DataType, AllowNull } from "sequelize-typescript";

import { ILog } from "../../../../../interfaces/models/ILog";

@Table({
  tableName: "logs",
  paranoid: true,
  timestamps: true,
})
export class Log extends Model<Log> implements ILog {
  @Column(DataType.STRING)
  event: string;

  @Column(DataType.STRING)
  description: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  params?: string;
}
