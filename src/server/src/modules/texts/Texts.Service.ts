import { Injectable, Provider, Inject } from "@nestjs/common";
import { parse } from "dotenv";
import { readFileSync } from "fs";

import { IConfigService } from "../../../../interfaces/services/IConfigService";
import { ITextsService } from "../../../../interfaces/services/ITextsService";

@Injectable()
export class TextsService implements ITextsService {

  constructor(
    @Inject(IConfigService) private readonly envConfig: IConfigService,
  ) {}

  private texts: {[key: string]: string} = parse(
    readFileSync(
      this.envConfig.get(TEXTS_ENV_KEYS.TEXTS_FILE) || "texts.txt",
    ),
  );

  public getText(messageType: string): string {
    return this.texts[messageType];
  }

}

export const TEXTS_ENV_KEYS = {
  TEXTS_FILE: "TEXTS_FILE_LOCATION",
};

export const TextsServiceProvider: Provider = {
  provide: ITextsService,
  useClass: TextsService,
};
