import { Module } from "@nestjs/common";

import { FileContentManagerService } from "./FileContentManager.Service";
import { FileManagerService } from "./FileManager.Service";
import { FileQueriesService } from "./FileQueries.Service";

@Module({
  providers: [
    FileContentManagerService,
    FileManagerService,
    FileQueriesService,
  ],
  exports: [
    FileContentManagerService,
    FileManagerService,
    FileQueriesService,
  ],
})
export class FileModule {}
