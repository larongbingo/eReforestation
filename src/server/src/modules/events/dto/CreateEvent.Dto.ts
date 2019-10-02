import { ApiModelProperty } from "@nestjs/swagger";
import { IsISO8601, IsNotEmpty } from "class-validator";

export class CreateEventDto {
  @ApiModelProperty({required: true })
  @IsNotEmpty()
  public readonly title: string;

  @ApiModelProperty({required: true })
  @IsNotEmpty()
  public readonly location: string;

  @ApiModelProperty({required: true })
  @IsISO8601()
  public readonly date: Date;

  @ApiModelProperty({required: true })
  @IsNotEmpty()
  public readonly description: string;
}
