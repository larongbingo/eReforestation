import { Module } from "@nestjs/common";

import { LogServiceProvider } from "./Log.Service";
import { LogController } from "./Log.Controller";

@Module({
  controllers: [LogController],
  providers: [LogServiceProvider],
  exports: [LogServiceProvider],
})
export class LogModule {}
