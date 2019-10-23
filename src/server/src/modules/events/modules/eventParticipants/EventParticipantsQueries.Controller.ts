import { Controller, Inject, Get, UseGuards, Param } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {} from "@nestjs/swagger";

import { IEventParticipantsService } from "../../../../../../interfaces/services/IEventParticipantsService";
import { IUser } from "../../../../../../interfaces/models/IUser";
import { UserEntity } from "../../../../decorators/User-Entity.Decorator";

@Controller("/event")

export class EventParticipantsQueriesController {

  constructor(
    @Inject(IEventParticipantsService) private readonly eventParticipantsService: IEventParticipantsService,
  ) {}

  @UseGuards(AuthGuard("bearer"))
  @Get("/participatingUsers/:eventId")
  public async sendUsersParticipatingInEvent(@Param() eventId: string, @UserEntity() user: IUser) {
    const participatingUsers = await this.eventParticipantsService.findAllByEventId(eventId);
    return {iat: Date.now(), participatingUsers};
  }

  @UseGuards(AuthGuard("bearer"))
  @Get("/confirmationId/:eventId")
  public async sendConfirmationId(@Param() eventId: string, @UserEntity() user: IUser) {
    const participatingUsers = await this.eventParticipantsService.findOneByEventIdAndUserId(eventId, user.id);
    return {iat: Date.now(), participatingUsers};
  }

}
