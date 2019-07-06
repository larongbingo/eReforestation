import {
  Model,
  Table,
  Column,
  DataType,
  AllowNull,
} from "sequelize-typescript";

import { IEvent } from "../../../../../interfaces/models/IEvent";

@Table({
  tableName: "events",
  paranoid: true,
  timestamps: true,
})
export class Event extends Model<Event> implements IEvent {
  @AllowNull(false)
  @Column(DataType.STRING)
  public title: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public location: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public date: Date;

  @AllowNull(false)
  @Column(DataType.STRING)
  public description: string;
}

export default Event;
