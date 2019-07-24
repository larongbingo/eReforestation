import { IsOptional, IsString } from "class-validator";

import { INews } from "../../../../../interfaces/models/INews";

export class UpdateNewsDto implements INews {
  @IsOptional()
  @IsString()
  headline: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  author?: string;
}
