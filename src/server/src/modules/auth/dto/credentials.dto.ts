import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CredentialsDto {
  @ApiModelProperty({required: true})
  @IsNotEmpty()
  public readonly username: string;

  @ApiModelProperty({required: true})
  @IsNotEmpty()
  public readonly password: string;
}
