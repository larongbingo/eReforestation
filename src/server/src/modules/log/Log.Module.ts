import { Module } from "@nestjs/common";

import { LogServiceProvider } from "./Log.Service";

@Module({
  providers: [LogServiceProvider],
  exports: [LogServiceProvider],
})
export class LogModule {}
