import {
  Controller,
  Get,
  Inject,
  Header,
  Res,
  UseInterceptors,
  UploadedFile,
  Post,
  UseGuards,
  UnauthorizedException
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import { Readable } from "stream";
import { Response } from "express";

import { IBackupService } from "../../../../interfaces/services/IBackupService";
import { IUser } from "../../../../interfaces/models/IUser";
import { IPermissionService } from "../../../../interfaces/services/IPermissionService";
import { UserEntity } from "../../decorators/User-Entity.Decorator";
import { File } from "../../types";

@Controller("/admin")
export class BackupController {
  constructor(
    @Inject(IBackupService) private readonly backupService: IBackupService,
    @Inject(IPermissionService) private readonly permissionService: IPermissionService
  ) {}

  @Get("/db/backup")
  @Header("Content-Type", "text/plain")
  @UseGuards(AuthGuard("bearer"))
  public async sendSqlDump(@Res() res: Response, @UserEntity() user: IUser) {
    if (!await this.permissionService.isUserSuperUser(user.id))
      return new UnauthorizedException("User does not have permission");
    const sqlDumpStream = await this.backupService.exportSqlDump();
    return sqlDumpStream.pipe(res);
  }

  @Post("/db/restore")
  @UseInterceptors(FileInterceptor("sqlDump"))
  @UseGuards(AuthGuard("bearer"))
  public async recieveSqlDump(@UploadedFile() file: File, @Res() res: Response, @UserEntity() user: IUser) {
    if (!await this.permissionService.isUserSuperUser(user.id))
      return new UnauthorizedException("User does not have permission");
    await this.backupService.importSqlDump(file.buffer);
    return {iat: Date.now()};
  }

  @Get("/images/backup")
  @Header("Content-Type", "application/zip")
  @UseGuards(AuthGuard("bearer"))
  public async sendImageZip(@Res() res: Response, @UserEntity() user: IUser) {
    if (!await this.permissionService.isUserSuperUser(user.id))
      return new UnauthorizedException("User does not have permission");
    const imageZipReadable = await this.backupService.exportImages();
    imageZipReadable.pipe(res);
  }

  @Post("/images/restore")
  @UseInterceptors(FileInterceptor("images"))
  @UseGuards(AuthGuard("bearer"))
  public async importImageZip(@UploadedFile() file: File, @UserEntity() user: IUser) {
    if(!await this.permissionService.isUserSuperUser(user.id))
      return new UnauthorizedException("User does not have permission");
    await this.backupService.importImages(file.buffer);
    return {iat: Date.now()};
  }
}
