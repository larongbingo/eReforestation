import { Controller, Get, Inject, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiImplicitHeader } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

import { ILogService } from "../../../../interfaces/services/ILogService";

@Controller("/log")
export class LogController {

  constructor(
    @Inject(ILogService) private readonly logService: ILogService,
  ) {}

  @ApiImplicitHeader({name: "Authorization", required: true})
  @ApiOperation({title: "Get Logs"})
  @UseGuards(AuthGuard("bearer"))
  @Get()
  public async sendLogs() {
    const logs = await this.logService.getLogs();
    return {iat: Date.now(), logs};
  }

}
