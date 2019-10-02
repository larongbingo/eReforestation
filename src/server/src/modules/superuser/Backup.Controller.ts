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
import {
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiUseTags,
  ApiImplicitFile,
  ApiImplicitHeader,
} from "@nestjs/swagger";
import { Readable } from "stream";
import { Response } from "express";

import { ITextsService } from "../../../../interfaces/services/ITextsService";
import { IBackupService } from "../../../../interfaces/services/IBackupService";
import { IUser } from "../../../../interfaces/models/IUser";
import { IPermissionService } from "../../../../interfaces/services/IPermissionService";
import { UserEntity } from "../../decorators/User-Entity.Decorator";
import { File } from "../../types";
import { TEXTS_KEYS } from "../texts/Texts.Key";

@Controller("/admin")
export class BackupController {
  constructor(
    @Inject(IBackupService) private readonly backupService: IBackupService,
    @Inject(IPermissionService) private readonly permissionService: IPermissionService,
    @Inject(ITextsService) private readonly texts: ITextsService,
  ) {}

  @ApiUseTags("SuperUser")
  @ApiOperation({title: "Export SQL Dump", description: "Exports a mysqldump file"})
  @ApiImplicitHeader({name: "Authorization", required: true})
  @ApiCreatedResponse({description: "The script for the mysqldump"})
  @ApiUnauthorizedResponse({description: "The account must have a SuperUser permission"})
  @Get("/db/backup")
  @Header("Content-Type", "text/plain")
  @UseGuards(AuthGuard("bearer"))
  public async sendSqlDump(@Res() res: Response, @UserEntity() user: IUser) {
    await this.isUserHasSudoPermission(user.id);
    const sqlDumpStream = await this.backupService.exportSqlDump();
    return sqlDumpStream.pipe(res);
  }

  @ApiUseTags("SuperUser")
  @ApiOperation({title: "Import SQL Dump", description: "Imports a mysqldump file"})
  @ApiImplicitHeader({name: "Authorization", required: true})
  @ApiImplicitFile({name: "sqlDump", required: true})
  @ApiOkResponse({description: "The date and time of the import"})
  @ApiUnauthorizedResponse({description: "The account must have a SuperUser permission"})
  @Post("/db/restore")
  @UseInterceptors(FileInterceptor("sqlDump"))
  @UseGuards(AuthGuard("bearer"))
  public async recieveSqlDump(@UploadedFile() file: File, @Res() res: Response, @UserEntity() user: IUser) {
    await this.isUserHasSudoPermission(user.id);
    await this.backupService.importSqlDump(file.buffer);
    return {iat: Date.now()};
  }

  @ApiUseTags("SuperUser")
  @ApiOperation({title: "Export Images", description: "Exports a images zip file"})
  @ApiImplicitHeader({name: "Authorization", required: true})
  @ApiCreatedResponse({description: "The zip file of the images"})
  @ApiUnauthorizedResponse({description: "The account must have a SuperUser permission"})
  @Get("/images/backup")
  @Header("Content-Type", "application/zip")
  @UseGuards(AuthGuard("bearer"))
  public async sendImageZip(@Res() res: Response, @UserEntity() user: IUser) {
    await this.isUserHasSudoPermission(user.id);
    const imageZipReadable = await this.backupService.exportImages();
    imageZipReadable.pipe(res);
  }

  @ApiUseTags("SuperUser")
  @ApiOperation({title: "Import Images", description: "Imports zipped image files"})
  @ApiImplicitHeader({name: "Authorization", required: true})
  @ApiImplicitFile({name: "sqlDump", required: true})
  @ApiOkResponse({description: "Time and date of the import"})
  @ApiUnauthorizedResponse({description: "The account must have a SuperUser permission"})
  @Post("/images/restore")
  @UseInterceptors(FileInterceptor("images"))
  @UseGuards(AuthGuard("bearer"))
  public async importImageZip(@UploadedFile() file: File, @UserEntity() user: IUser) {
    await this.isUserHasSudoPermission(user.id);
    await this.backupService.importImages(file.buffer);
    return {iat: Date.now()};
  }

  private async isUserHasSudoPermission(userId: string) {
    if (!await this.permissionService.isUserSuperUser(userId)) {
      throw new UnauthorizedException(
        this.texts.getText(TEXTS_KEYS.MISSING_SUDO_CREDENTIALS),
      );
    }
  }

}
