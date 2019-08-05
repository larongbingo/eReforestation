import { Controller, Inject, Post, Delete, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { IEventParticipantsService } from "../../../../../../interfaces/services/IEventParticipantsService";
import { IUser } from "../../../../../../interfaces/models/IUser";
import { UserEntity } from "../../../../decorators/User-Entity.Decorator";

@Controller("/event")
export class EventParticipantsController {
  constructor(
    @Inject(IEventParticipantsService) private readonly eventParticipantsSvc: IEventParticipantsService,
  ) {}

  @UseGuards(AuthGuard("bearer"))
  @Post("/join/:eventId")
  public async joinEvent(@Param("eventId") eventId: string, @UserEntity() user: IUser) {
    const confirmationString = await this.eventParticipantsSvc.joinEvent(user.id, eventId);
    return {iat: Date.now(), confirmationString};
  }

  @UseGuards(AuthGuard("bearer"))
  @Delete("/leave/:eventId")
  public async leaveEvent(@Param("eventId") eventId: string, @UserEntity() user: IUser) {
    this.eventParticipantsSvc.leaveEvent(user.id, eventId);
    return {iat: Date.now()};
  }
}
