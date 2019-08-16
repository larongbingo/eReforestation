import { Injectable, Inject, Provider } from "@nestjs/common";

import { IAdminMailingService } from "../../../../../../interfaces/services/IAdminService";
import { IMailService, IContactRetrievalService } from "../../../../../../interfaces/services/IMailService";

@Injectable()
export class AdminMailingService implements IAdminMailingService {
  constructor(
    @Inject(IMailService) private readonly mailService: IMailService,
    @Inject(IContactRetrievalService) private readonly contactRetrievalService: IContactRetrievalService,
  ) {}

  // TODO: Add a param for the id of the event
  public async mailUserOnSuccessfulApplication(userId: string): Promise<void> {
    const contact = await this.contactRetrievalService.retrieveContacts(userId);
    this.mailService.sendMail({
      to: contact.emailAddress,
      title: "Event Application Approved",
      message: "Your application to join an event has been approved.",
    });
  }

  // TODO: Add a param for the id of the event
  public async mailUserOnFailedApplication(userId: string): Promise<void> {
    const contact = await this.contactRetrievalService.retrieveContacts(userId);
    this.mailService.sendMail({
      to: contact.emailAddress,
      title: "Event Application Rejected",
      message: "Your application to join an event has been rejected.",
    });
  }

  // TODO: Add a param for the reason of the ban
  public async mailUserOnBan(userId: string): Promise<void> {
    const contact = await this.contactRetrievalService.retrieveContacts(userId);
    this.mailService.sendMail({
      to: contact.emailAddress,
      title: "eReforestation Account Banned",
      message: "Your account has been banned.",
    });
  }

  public async mailUserOnUnban(userId: string): Promise<void> {
    const contact = await this.contactRetrievalService.retrieveContacts(userId);
    this.mailService.sendMail({
      to: contact.emailAddress,
      title: "eReforestation Account Unbanned",
      message: "Your account has been unbanned.",
    });
  }

}

export const AdminMailingServiceProvider: Provider<AdminMailingService> = {
  provide: IAdminMailingService,
  useClass: AdminMailingService,
};
