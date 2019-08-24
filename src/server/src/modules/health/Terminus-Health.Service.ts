import {
  TerminusEndpoint,
  TerminusOptionsFactory,
  DNSHealthIndicator,
  TerminusModuleOptions,
  DiskHealthIndicator,
  MemoryHealthIndicator,
} from "@nestjs/terminus";
import { Injectable } from "@nestjs/common";

import { MySQLConnectionHealthIndicator } from "./MySQLConnection.Health";

@Injectable()
export class TerminusOptionsService implements TerminusOptionsFactory {
  constructor(
    private readonly dns: DNSHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private readonly db: MySQLConnectionHealthIndicator,
  ) {}

  public createTerminusOptions(): TerminusModuleOptions {
    const healthEndpoints: TerminusEndpoint = {
      url: "/health",
      healthIndicators: [
        async () => this.dns.pingCheck("Google", "https://google.com"),
        async () => this.memory.checkHeap("memory_heap", 200 * 1024 * 1024),
        async () => this.memory.checkRSS("memory_rss", 3000 * 1024 * 1024),
        async () => this.db.isHealthy("database"),
      ],
    };

    return {
      endpoints: [healthEndpoints],
    };
  }
}
