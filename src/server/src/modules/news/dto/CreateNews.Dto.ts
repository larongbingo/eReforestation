import { IsString, IsNotEmpty } from "class-validator";

export class CreateNewsDto {
  @IsNotEmpty()
  @IsString()
  headline: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
