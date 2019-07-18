import { MinLength } from "class-validator";

export class UpdateUserDto {
  @MinLength(8)
  password?: string;
}
