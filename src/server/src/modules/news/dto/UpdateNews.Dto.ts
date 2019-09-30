import { ApiModelPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

import { INews } from "../../../../../interfaces/models/INews";

export class UpdateNewsDto implements Partial<INews> {
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  headline?: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  content?: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  author?: string;
}
