import { Injectable, Inject, Provider } from "@nestjs/common";

import { IAdminMailingService } from "../../../../../../interfaces/services/IAdminService";
import { IMailService, IContactRetrievalService } from "../../../../../../interfaces/services/IMailService";

@Injectable()
export class AdminMailingService implements IAdminMailingService {
  constructor(
    @Inject(IMailService) private readonly mailService: IMailService,
    @Inject(IContactRetrievalService) private readonly contactRetrievalService: IContactRetrievalService,
  ) {}

  public async mailUserOnSuccessfulApplication(userId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async mailUserOnFailedApplication(userId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async mailUserOnBan(userId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async mailUserOnUnban(userId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

}

export const AdminMailingServiceProvider: Provider<AdminMailingService> = {
  provide: IAdminMailingService,
  useClass: AdminMailingService,
};
