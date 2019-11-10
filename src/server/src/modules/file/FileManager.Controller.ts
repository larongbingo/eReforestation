import { Inject, Controller, Put, Post, Delete, UseGuards, Body, UnauthorizedException, Param } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { IFileManagerService } from "../../../../interfaces/services/IFileService";
import { IPermissionService } from "../../../../interfaces/services/IPermissionService";
import { IUser } from "../../../../interfaces/models/IUser";
import { UserEntity } from "../../decorators/User-Entity.Decorator";

import { CreateFileDto } from "./dto/CreateFile.Dto";
import { UpdateFileDto } from "./dto/UpdateFile.Dto";

@Controller("/admin/file")
export class FileManagerController {

  constructor(
    @Inject(IFileManagerService) private readonly fileManagerService: IFileManagerService,
    @Inject(IPermissionService) private readonly permissionService: IPermissionService,
  ) {}

  @UseGuards(AuthGuard("bearer"))
  @Post()
  public async createFile(
    @UserEntity() user: IUser,
    @Body() createFile: CreateFileDto,
  ) {
    if (!await this.permissionService.isUserAdminOrSuperUser(user.id)) {
      throw new UnauthorizedException();
    }

    const file = await this.fileManagerService.createFile(createFile);

    return {iat: Date.now(), file};
  }

  @UseGuards(AuthGuard("bearer"))
  @Put("/:fileId")
  public async updateFile(
    @UserEntity() user: IUser,
    @Body() updateFile: UpdateFileDto,
    @Param() fileId: string,
  ) {
    if (!await this.permissionService.isUserAdminOrSuperUser(user.id)) {
      throw new UnauthorizedException();
    }

    const updatedFile = await this.fileManagerService.updateFile(updateFile, fileId);

    return {iat: Date.now(), updatedFile};
  }

  @UseGuards(AuthGuard("bearer"))
  @Delete("/:fileId")
  public async deleteFile(@UserEntity() user: IUser, @Param() fileId: string) {
    if (!await this.permissionService.isUserAdminOrSuperUser(user.id)) {
      throw new UnauthorizedException();
    }

    await this.fileManagerService.deleteFile(fileId);

    return {iat: Date.now()};
  }

}
