import { ApiModelProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class CreateNewsDto {

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  headline: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  content: string;

}
