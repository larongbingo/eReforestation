import { Readable } from "stream";

export const IBackupService = "IBackupService";
export interface IBackupService {

  exportSqlDump(): Promise<Readable>;

  importSqlDump(fileBuff: Buffer): Promise<void>;

}
