import { IsISO8601, IsNotEmpty } from "class-validator";

export class CreateEventDto {
  @IsNotEmpty()
  public readonly title: string;

  @IsNotEmpty()
  public readonly location: string;

  @IsISO8601()
  public readonly date: Date;

  @IsNotEmpty()
  public readonly description: string;
}
