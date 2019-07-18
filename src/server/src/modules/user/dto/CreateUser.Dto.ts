import { IsNotEmpty, MinLength } from "class-validator";

import { IUser } from "../../../../../interfaces/models/IUser";

export class CreateUserDto implements IUser {
  @IsNotEmpty()
  username: string;

  @MinLength(8)
  password: string;
}
