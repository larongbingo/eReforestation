import { Model, Table, Column, DataType, HasOne, BeforeCreate } from "sequelize-typescript";

import { INews } from "../../../../../interfaces/models/INews";

import { User } from "./User.Model";
import { UserDetails } from "./UserDetails.Model";
import { NewsMeta } from "./NewsMeta.Model";

@Table({
  tableName: "news",
  paranoid: true,
  timestamps: true,
})
export class News extends Model<News> implements INews {

  @BeforeCreate
  private static async assignAuthorName(instance: News) {
    const author = await UserDetails.findOne({where: {userId: instance.author}});

    if (!author) {
      throw new Error("User does not exist/User does not have details");
    }

    instance.author = `${author.firstName} ${author.middleName} ${author.lastName}`;
  }

  @Column(DataType.STRING)
  headline: string;

  @Column(DataType.STRING)
  featureImage?: string;

  @Column(DataType.TEXT({length: "long"}))
  content: string;

  @Column(DataType.STRING)
  author?: string;

  @HasOne(() => NewsMeta)
  newsMeta: NewsMeta;
}

export default News;
