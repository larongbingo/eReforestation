import { Controller, Inject, Post, Delete, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiUseTags, ApiCreatedResponse, ApiImplicitHeader, ApiImplicitParam, ApiOperation } from "@nestjs/swagger";

import { IEventParticipantsService } from "../../../../../../interfaces/services/IEventParticipantsService";
import { IUser } from "../../../../../../interfaces/models/IUser";
import { UserEntity } from "../../../../decorators/User-Entity.Decorator";

@Controller("/event")
export class EventParticipantsController {
  constructor(
    @Inject(IEventParticipantsService) private readonly eventParticipantsSvc: IEventParticipantsService,
  ) {}

  @ApiUseTags("Participant")
  @ApiOperation({title: "Join Event"})
  @ApiImplicitParam({name: "eventId", required: true, description: "The id of the event you wish to join"})
  @ApiImplicitHeader({name: "Authorization", required: true})
  @ApiCreatedResponse({description: "The details of the participation"})
  @UseGuards(AuthGuard("bearer"))
  @Post("/join/:eventId")
  public async joinEvent(@Param("eventId") eventId: string, @UserEntity() user: IUser) {
    const confirmationString = await this.eventParticipantsSvc.joinEvent(user.id, eventId);
    return {iat: Date.now(), confirmationString};
  }

  @ApiUseTags("Participant")
  @ApiOperation({title: "Leave Event"})
  @ApiImplicitParam({name: "eventId", required: true, description: "The id of the event you want to leave"})
  @ApiImplicitHeader({name: "Authorization", required: true})
  @ApiCreatedResponse({description: "The time you left the event"})
  @UseGuards(AuthGuard("bearer"))
  @Delete("/leave/:eventId")
  public async leaveEvent(@Param("eventId") eventId: string, @UserEntity() user: IUser) {
    this.eventParticipantsSvc.leaveEvent(user.id, eventId);
    return {iat: Date.now()};
  }
}
