import { Model, Table, Column, DataType } from "sequelize-typescript";

import { IImage } from "../../../../../interfaces/models/IImage";

@Table({
  tableName: "images",
  paranoid: true,
  timestamps: true,
})
export class Image extends Model<Image> implements IImage {

  @Column(DataType.STRING)
  public fileName: string;

  @Column(DataType.STRING)
  public extension: string;

}
