import { Model, Table, Column, DataType, ForeignKey } from "sequelize-typescript";

import { INews } from "../../../../../interfaces/models/INews";

import { User } from "./User.Model";

@Table({
  tableName: "news",
  paranoid: true,
  timestamps: true,
})
export class News extends Model<News> implements INews {
  @Column(DataType.STRING)
  headline: string;

  @Column(DataType.STRING)
  content: string;

  @ForeignKey(() => User)
  @Column(DataType.STRING)
  author?: string;
}

export default News;
