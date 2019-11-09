import { Injectable } from "@nestjs/common";

import { IFileManagerService } from "../../../../interfaces/services/IFileService";
import { IFile } from "../../../../interfaces/models/IFile";
import { File } from "../database/models/File.Model";

@Injectable()
export class FileManagerService implements IFileManagerService {

  public async createFile(file: IFile): Promise<IFile> {
    return File.create(file);
  }

  public async updateFile(file: Partial<IFile>, fileId: string): Promise<[number, IFile[]]> {
    return File.update(file, {where: {id: fileId}});
  }

  deleteFile(fileId: string): Promise<void> {
    File.destroy({where: {id: fileId}});
    return;
  }

}
