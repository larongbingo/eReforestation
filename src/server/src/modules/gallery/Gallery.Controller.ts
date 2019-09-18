import {
  Controller,
  Inject,
  Post,
  Get,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Param,
  UnauthorizedException,
  BadRequestException,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "@nestjs/passport";

import { IPermissionService } from "../../../../interfaces/services/IPermissionService";
import { IGalleryService } from "../../../../interfaces/services/IGalleryService";
import { IUser } from "../../../../interfaces/models/IUser";
import { UserEntity } from "../../decorators/User-Entity.Decorator";
import { File } from "../../types";

import { FILE_EXTENSION_WHITELIST } from "./FileExtension.Whitelist";

@Controller("/gallery")
export class GalleryController {

  constructor(
    @Inject(IGalleryService) private readonly galleryService: IGalleryService,
    @Inject(IPermissionService) private readonly permissionService: IPermissionService,
  ) {}

  @Get("/image")
  public async getAllImages(@Param("name") fileName: string) {
    const fileNames = this.galleryService.getAllImagesNames();
    return { iat: Date.now(), fileNames };
  }

  @Post("/image")
  @UseInterceptors(FileInterceptor("image"))
  @UseGuards(AuthGuard("bearer"))
  public async recieveImage(@UploadedFile() file: File, @UserEntity() user: IUser) {
    if (!(await this.permissionService.isUserAdminOrSuperUser(user.id))) 
      throw new UnauthorizedException("User does not have admin access");

    const extension = this.retrieveExtensionInFilename(file.originalname);
    this.isFileFormatAllowed(extension);

    const fileName = await this.galleryService.storeImage(file.buffer, extension);
    return { iat: Date.now(), fileName };
  }

  private isFileFormatAllowed(extension: string) {
    let isExtensionIsInWhitelist = false;

    for(const allowedExtension of FILE_EXTENSION_WHITELIST) {
      if(allowedExtension === extension) {
        isExtensionIsInWhitelist = true;
      }
    }

    let fileExtensionsString = "";
    FILE_EXTENSION_WHITELIST.forEach(ext => fileExtensionsString += ext + " ");

    if(!isExtensionIsInWhitelist) {
      throw new BadRequestException("The file is not allowed. Allowed are: " + fileExtensionsString);
    }
  }

  private retrieveExtensionInFilename(fileName: string) {
    const fileNameArray = fileName.split('.');
    const extension = fileNameArray[fileNameArray.length - 1];
    return extension;
  }

}
