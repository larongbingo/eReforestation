import { Model, Column, Table, DataType, PrimaryKey, HasMany } from "sequelize-typescript";

import { IFile } from "../../../../../interfaces/models/IFile";

import { NewsMeta } from "./NewsMeta.Model";

@Table({
  tableName: "files",
  paranoid: true,
  timestamps: true,
})
export class File extends Model<File> implements IFile {

  @PrimaryKey
  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  description: string;

  @HasMany(() => NewsMeta)
  newsMeta: string;

}
