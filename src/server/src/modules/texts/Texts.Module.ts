import { Module } from "@nestjs/common";

import { ConfigModule } from "../config/Config.Module";

import { TextsServiceProvider } from "./Texts.Service";

@Module({
  imports: [ConfigModule],
  providers: [TextsServiceProvider],
  exports: [TextsServiceProvider],
})
export class TextsModule {}
