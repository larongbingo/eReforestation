import { IsOptional } from "class-validator";

import { INews } from "../../../../../interfaces/models/INews";

export class CreateArticleDto implements Omit<INews, "id"> {

  @IsOptional()
  headline: string;

  @IsOptional()
  content: string;

  @IsOptional()
  createdAt: string;

  @IsOptional()
  author: string;

}
