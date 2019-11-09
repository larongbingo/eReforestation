import { IsOptional } from "class-validator";

import { IFile } from "../../../../../interfaces/models/IFile";

export class UpdateFileDto implements Omit<IFile, "isDeletable"> {

  @IsOptional()
  name: string;

  @IsOptional()
  description: string;

}
