import { IsNotEmpty } from "class-validator";

export class BanUserDto {

  @IsNotEmpty()
  reason: string;

}
