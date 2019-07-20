import { Module } from "@nestjs/common";

import { PermissionModule } from "../permissions/Permission.Module";

import { NewsService } from "./News.Service";

@Module({
  imports: [
    PermissionModule,
  ],
  providers: [
    NewsService,
  ],
})
export class NewsModule {}
