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
    @Inject(IPermissionService)
    private readonly permissionService: IPermissionService
  ) {}

  @Get("/backup")
  @Header("Content-Type", "text/plain")
  @UseGuards(AuthGuard("bearer"))
  public async sendSqlDump(@Res() res: Response, @UserEntity() user: IUser) {
    if (!this.permissionService.isUserAdmin(user.id))
      return new UnauthorizedException("User does not have permission");
    const sqlDumpStream = await this.backupService.exportSqlDump();
    return sqlDumpStream.pipe(res);
  }

  @Post("/restore")
  @UseInterceptors(FileInterceptor("sqlDump"))
  @UseGuards(AuthGuard("bearer"))
  public async recieveSqlDump(@UploadedFile() file: File, @Res() res: Response, @UserEntity() user: IUser) {
    if (!this.permissionService.isUserAdmin(user.id))
      return new UnauthorizedException("User does not have permission");
    await this.backupService.importSqlDump(file.buffer);
    return {iat: Date.now()};
  }
}
