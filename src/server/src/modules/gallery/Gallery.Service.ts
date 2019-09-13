import { Injectable, Provider } from "@nestjs/common";
import { PassThrough, pipeline } from "stream";
import { createWriteStream } from "fs";
import { generate } from "randomstring";
import { promisify } from "util";

import { IGalleryService } from "../../../../interfaces/services/IGalleryService";
import { Image } from "../database/models/Image.Model";

@Injectable()
export class GalleryService implements IGalleryService {

  public async getAllImagesNames(): Promise<string[]> {
    throw new Error("Method not implemented.");
  }

  public async storeImage(imageBuffer: Buffer, extension: string): Promise<string> {
    const imageBufferPass = new PassThrough();
    imageBufferPass.end(imageBuffer);

    const imageFileName = `${generate({length: 20, charset: "alphanumeric"})}.${extension}`;

    const imageWStream = createWriteStream(`./static/${imageFileName}`, {
      flags:"w"
    });

    const imagePipeline = promisify(pipeline);
    await imagePipeline(imageBufferPass, imageWStream);

    await Image.create({fileName: imageFileName, extension});

    return imageFileName;
  }

}

export const GalleryServiceProvider: Provider = {
  provide: IGalleryService,
  useClass: GalleryService,
};
