import { Model, Table, Column, DataType, ForeignKey, PrimaryKey, BeforeCreate } from "sequelize-typescript";
import { generate } from "randomstring";

import { IEventParticipants } from "../../../../../interfaces/models/IEventParticipants";

import { User } from "./User.Model";
import Event from "./Event.Model";

@Table({
  tableName: "eventParticipants",
  paranoid: false,
})
export class EventParticipants extends Model<EventParticipants> implements IEventParticipants {
  @BeforeCreate
  private static async generateId(instance: EventParticipants) {
    instance.id = generate({charset: "alphanumeric", length: 15});
  }

  @PrimaryKey
  @Column(DataType.STRING)
  id: string;

  @ForeignKey(() => User)
  @Column(DataType.STRING)
  userId: string;

  @ForeignKey(() => Event)
  @Column(DataType.STRING)
  eventId: string;

  @Column(DataType.STRING)
  confirmed: boolean;
}
