import { IsString } from "class-validator";

import { IFile } from "../../../../../interfaces/models/IFile";

export class CreateFileDto implements Omit<IFile, "isDeletable"> {

  @IsString()
  name: string;

  @IsString()
  description: string;

}
