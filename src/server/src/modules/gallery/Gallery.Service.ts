import { Injectable, Provider, BadRequestException, Inject } from "@nestjs/common";
import { PassThrough, pipeline } from "stream";
import { createWriteStream } from "fs";
import { generate } from "randomstring";
import { promisify } from "util";

import { ITextsService } from "../../../../interfaces/services/ITextsService";
import { IGalleryService } from "../../../../interfaces/services/IGalleryService";
import { Image } from "../database/models/Image.Model";
import { TEXTS_KEYS } from "../texts/Texts.Key";

import { FILE_EXTENSION_WHITELIST } from "./FileExtension.Whitelist";

@Injectable()
export class GalleryService implements IGalleryService {

  constructor(
    @Inject(ITextsService) private readonly texts: ITextsService,
  ) {}

  public async getAllImagesNames(): Promise<string[]> {
    const images = await Image.findAll();
    const fileNames = images.map(image => image.fileName);
    return fileNames;
  }

  public async storeImage(imageBuffer: Buffer, originalFileName: string): Promise<string> {
    const extension = this.retrieveExtensionInFilename(originalFileName);
    this.isFileFormatAllowed(extension);

    const imageBufferPass = new PassThrough();
    imageBufferPass.end(imageBuffer);

    const imageFileName = `${generate({length: 20, charset: "alphanumeric"})}.${extension}`;

    const imageWStream = createWriteStream(`./static/${imageFileName}`, {
      flags: "w",
    });

    const imagePipeline = promisify(pipeline);
    await imagePipeline(imageBufferPass, imageWStream);

    await Image.create({fileName: imageFileName, extension});

    return imageFileName;
  }

  private retrieveExtensionInFilename(fileName: string) {
    const fileNameArray = fileName.split(".");
    const extension = fileNameArray[fileNameArray.length - 1];
    return extension;
  }

  private isFileFormatAllowed(extension: string) {
    let isExtensionIsInWhitelist = false;

    for (const allowedExtension of FILE_EXTENSION_WHITELIST) {
      if (allowedExtension === extension) {
        isExtensionIsInWhitelist = true;
      }
    }

    let fileExtensionsString = "";
    FILE_EXTENSION_WHITELIST.forEach(ext => fileExtensionsString += ext + " ");

    if (!isExtensionIsInWhitelist) {
      throw new BadRequestException(
        this.texts.getText(
          TEXTS_KEYS.GALLERY_FILE_NOT_ALLOWED_TEMPLATE.replace("%s", fileExtensionsString),
        ),
      );
    }
  }

}

export const GalleryServiceProvider: Provider = {
  provide: IGalleryService,
  useClass: GalleryService,
};
