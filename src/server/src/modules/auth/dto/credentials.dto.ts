import { IsNotEmpty } from "class-validator";

export class CredentialsDto {
  @IsNotEmpty()
  public readonly username: string;

  @IsNotEmpty()
  public readonly password: string;
}
