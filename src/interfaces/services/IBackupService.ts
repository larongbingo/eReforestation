import { Readable } from "stream";
import { ReadStream, WriteStream } from "fs";

export const IBackupService = "IBackupService";
export interface IBackupService {

  exportSqlDump(): Promise<Readable>;

  importSqlDump(fileBuff: Buffer): Promise<void>;

  exportImages(): Promise<Readable>;

  importImages(fileBuff: Buffer): Promise<void>;

}
