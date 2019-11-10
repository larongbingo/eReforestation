import {
  Model,
  Table,
  Column,
  DataType,
  AllowNull,
  Default,
} from "sequelize-typescript";

import { IEvent, EventStatus } from "../../../../../interfaces/models/IEvent";

@Table({
  tableName: "events",
  paranoid: true,
  timestamps: true,
})
export class Event extends Model<Event> implements IEvent {
  @AllowNull(false)
  @Column(DataType.STRING)
  public title: string;

  @Column(DataType.STRING)
  featureImage?: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public location: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public date: Date;

  @AllowNull(false)
  @Column(DataType.TEXT("LONG"))
  public description: string;

  @Default(EventStatus.Go)
  @Column(DataType.STRING)
  public status: EventStatus;
}

export default Event;
