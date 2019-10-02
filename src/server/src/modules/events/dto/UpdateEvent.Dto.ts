import { ApiModelPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

import { EventStatus, IEvent } from "../../../../../interfaces/models/IEvent";

export class UpdateEventDto implements Partial<IEvent> {

  @ApiModelPropertyOptional()
  @IsOptional()
  public readonly title?: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  public readonly location?: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  public readonly date?: Date;

  @ApiModelPropertyOptional()
  @IsOptional()
  public readonly description?: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  public readonly status?: EventStatus;

}
