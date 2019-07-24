import { IsString, IsNotEmpty } from "class-validator";

import { INews } from "../../../../../interfaces/models/INews";

export class CreateNewsDto implements INews {
  @IsNotEmpty()
  @IsString()
  headline: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  author?: string;
}
