import { Controller, Post, Put, Get, Inject, Param, Body, UseGuards, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { IPermissionService } from "../../../../interfaces/services/IPermissionService";
import { IEventService } from "../../../../interfaces/services/IEventService";
import { IUser } from "../../../../interfaces/models/IUser";
import { EventStatus } from "../../../../interfaces/models/IEvent";
import { UserEntity } from "../../decorators/User-Entity.Decorator";

import { CreateEventDto } from "./dto/CreateEvent.Dto";
import { UpdateEventDto } from "./dto/UpdateEvent.Dto";

@Controller("/event")
export class EventController {
  constructor(
    @Inject(IEventService) private readonly eventService: IEventService,
    @Inject(IPermissionService) private readonly permissionService: IPermissionService,
  ) { }

  @Get()
  public async getEvents() {
    const events = await this.eventService.getEvents();
    return {iat: Date.now(), events};
  }

  @Post()
  @UseGuards(AuthGuard("bearer"))
  public async createEvent(@Body() createEventDto: CreateEventDto, @UserEntity() user: IUser) {
    if (!await this.permissionService.isUserAdminOrSuperUser(user.id)) {
      throw new UnauthorizedException("Your account does not have a permissions that allows to create an event");
    }

    const newEvent = await this.eventService.createEvent({...createEventDto, status: EventStatus.Go});
    return {iat: Date.now(), newEvent};
  }

  @Put("/:id")
  @UseGuards(AuthGuard("bearer"))
  public async updateEvent(
    @Param("id") eventId: string,
    @Body() updateEventDto: UpdateEventDto,
    @UserEntity() user: IUser,
  ) {
    if (!await this.permissionService.isUserAdminOrSuperUser(user.id)) {
      throw new UnauthorizedException("Your account does not permit you to create new events");
    }

    const updatedEvent = await this.eventService.updateEvent(updateEventDto, eventId);
    return {iat: Date.now(), updatedEvent};
  }
}
