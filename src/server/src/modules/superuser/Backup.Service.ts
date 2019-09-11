import { Injectable, Provider } from "@nestjs/common";
import { spawn, execSync } from "child_process";
import { createWriteStream } from "fs";
import { promisify } from "util";
import { pipeline, Readable, PassThrough } from "stream";

import { IBackupService } from "../../../../interfaces/services/IBackupService";
import { DatabaseConnectionConfig } from "../database/DatabaseConnectionConfig";

@Injectable()
export class BackupService implements IBackupService {
  private readonly DUMP_FILENAME = "dump.sql";

  private readonly dbConfig = new DatabaseConnectionConfig();

  public async exportSqlDump(): Promise<Readable> {
    const mysqldump = spawn("mysqldump", [
      "-u",
      this.dbConfig.username,
      `-p${this.dbConfig.password}`,
      "-h",
      this.dbConfig.host,
      this.dbConfig.database
    ]);

    return mysqldump.stdout;
  }

  public async importSqlDump(fileBuff: Buffer): Promise<void> {
    await this.pipeOutImportedDump(fileBuff);

    execSync(
      `mysql -u ${this.dbConfig.username} -p${this.dbConfig.password} -h ${this.dbConfig.host} ` + 
      `${this.dbConfig.database} < ${this.DUMP_FILENAME}`
    );
  }

  private async pipeOutImportedDump(fileBuff: Buffer) {
    const fileBuffPass = new PassThrough();
    fileBuffPass.end(fileBuff);

    const sqlDumpWStream = createWriteStream(this.DUMP_FILENAME, {
      flags: "w"
    });

    const dumpPipeline = promisify(pipeline);
    await dumpPipeline(fileBuffPass, sqlDumpWStream);
  }
}

export const BackupServiceProvider: Provider<BackupService> = {
  provide: IBackupService,
  useClass: BackupService
};
