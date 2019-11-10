import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";

import { INewsMeta } from "../../../../../interfaces/models/INews";

import { News } from "./News.Model";
import { File } from "./File.Model";

@Table({
  tableName: "newsMeta",
  paranoid: true,
  timestamps: false,
})
export class NewsMeta extends Model<NewsMeta> implements INewsMeta {

  @ForeignKey(() => News)
  @Column(DataType.INTEGER)
  newsId?: number;

  @ForeignKey(() => File)
  @Column(DataType.STRING)
  fileId?: string;

  @BelongsTo(() => News)
  news: News;

}
