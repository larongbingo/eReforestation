import { Injectable, Provider, Inject } from "@nestjs/common";
import { spawn, execSync, exec } from "child_process";
import { createWriteStream, createReadStream, ReadStream } from "fs";
import { promisify, inspect } from "util";
import { pipeline, Readable, PassThrough } from "stream";
import archiver from "archiver";
import { Extract } from "unzip";
import rimraf from "rimraf";
import { join } from "path";

import { IConfigService } from "../../../../interfaces/services/IConfigService";
import { IBackupService } from "../../../../interfaces/services/IBackupService";
import { DatabaseConnectionConfig } from "../config/configs/database/DatabaseConnectionConfig";

@Injectable()
export class BackupService implements IBackupService {

  constructor(
    @Inject(IConfigService) private readonly dbConfig: DatabaseConnectionConfig,
  ) {}

  private readonly DUMP_FILENAME = "dump.sql";
  private readonly EXPORT_IMAGES_FILENAME = "images.zip";
  private readonly IMAGES_TABLE = "images";
  private readonly IMAGES_TABLE_DUMP = "images.sql";

  public async exportSqlDump(): Promise<Readable> {
    const mysqldump = spawn("mysqldump", [
      "-u",
      this.dbConfig.username,
      `-p${this.dbConfig.password}`,
      "-h",
      this.dbConfig.host,
      this.dbConfig.database,
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

  public async exportImages(): Promise<Readable> {
    await this.archiveImages();
    return createReadStream(this.EXPORT_IMAGES_FILENAME);
  }

  public async importImages(fileBuff: Buffer): Promise<void> {
    await this.pipeOutImportedImages(fileBuff);

    // TODO: Piping of files from zip is still not done even if awaited
    // Pipe images.sql to mysql
    setTimeout(() => execSync(
      `mysql -u ${this.dbConfig.username} -p${this.dbConfig.password} -h ${this.dbConfig.host} ` + 
      `${this.dbConfig.database} < ${join(process.cwd(), "static", this.IMAGES_TABLE_DUMP)}`
    ), 1000);
  }

  private async pipeOutImportedImages(fileBuff: Buffer) {
    // Remove old files
    const asyncRimraf = promisify(rimraf);
    await asyncRimraf("static");

    // Unzip the images
    const imagesZipPass = new PassThrough();
    imagesZipPass.end(fileBuff);
    const unzipPipeline = promisify(pipeline);
    await unzipPipeline(imagesZipPass, Extract({path: "./static"}));
  }

  private async archiveImages() {
    const mysqldump = spawn("mysqldump", [
      "-u",
      this.dbConfig.username,
      `-p${this.dbConfig.password}`,
      "-h",
      this.dbConfig.host,
      this.dbConfig.database,
      this.IMAGES_TABLE,
    ]);

    const archiveWStream = createWriteStream(this.EXPORT_IMAGES_FILENAME, {
      flags: "w",
    });

    const archive = archiver("zip", {zlib: {level: 9}});
    archive.directory("./static", false);
    archive.append(mysqldump.stdout, {name: this.IMAGES_TABLE_DUMP});
    archive.pipe(archiveWStream);
    await archive.finalize();
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
  useClass: BackupService,
};
