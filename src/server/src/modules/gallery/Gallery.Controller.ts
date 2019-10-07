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
  Logger,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "@nestjs/passport";
import { ApiConsumes, ApiImplicitFile, ApiImplicitHeader, ApiUseTags, ApiCreatedResponse } from "@nestjs/swagger";

import { ITextsService } from "../../../../interfaces/services/ITextsService";
import { IPermissionService } from "../../../../interfaces/services/IPermissionService";
import { IGalleryService } from "../../../../interfaces/services/IGalleryService";
import { IUser } from "../../../../interfaces/models/IUser";
import { UserEntity } from "../../decorators/User-Entity.Decorator";
import { File } from "../../types";
import { TEXTS_KEYS } from "../texts/Texts.Key";

import { FILE_EXTENSION_WHITELIST } from "./FileExtension.Whitelist";

@Controller("/gallery")
export class GalleryController {

  constructor(
    @Inject(IGalleryService) private readonly galleryService: IGalleryService,
    @Inject(IPermissionService) private readonly permissionService: IPermissionService,
    @Inject(ITextsService) private readonly texts: ITextsService,
  ) {}

  @ApiUseTags("Public")
  @ApiCreatedResponse({description: "The list of all files stored"})
  @Get("/image")
  public async getAllImages() {
    const fileNames = this.galleryService.getAllImagesNames();
    return { iat: Date.now(), fileNames };
  }

  @ApiUseTags("Admin")
  @ApiConsumes("multipart/form-data")
  @ApiImplicitHeader({name: "Authorization", required: true})
  @ApiImplicitFile({name: "image", required: true, description: "The image that needs to be uploaded"})
  @Post("/image")
  @UseInterceptors(FileInterceptor("image"))
  @UseGuards(AuthGuard("bearer"))
  public async recieveImage(@UploadedFile() file: File, @UserEntity() user: IUser) {
    if (!(await this.permissionService.isUserAdminOrSuperUser(user.id))) {
      throw new UnauthorizedException(
        this.texts.getText(
          TEXTS_KEYS.MISSING_ADMIN_OR_SUDO_CREDENTIALS,
        ),
      );
    }

    if (!file) {
      throw new BadRequestException();
    }

    const fileName = await this.galleryService.storeImage(file.buffer, file.originalname);
    return { iat: Date.now(), fileName };
  }

}
