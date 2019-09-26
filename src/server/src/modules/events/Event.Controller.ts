import { Controller, Post, Put, Get, Inject, Param, Body, UseGuards, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { ITextsService } from "../../../../interfaces/services/ITextsService";
import { IPermissionService } from "../../../../interfaces/services/IPermissionService";
import { IEventService } from "../../../../interfaces/services/IEventService";
import { IUser } from "../../../../interfaces/models/IUser";
import { EventStatus } from "../../../../interfaces/models/IEvent";
import { UserEntity } from "../../decorators/User-Entity.Decorator";
import { TEXTS_KEYS } from "../texts/Texts.Key";

import { CreateEventDto } from "./dto/CreateEvent.Dto";
import { UpdateEventDto } from "./dto/UpdateEvent.Dto";

@Controller("/event")
export class EventController {
  constructor(
    @Inject(IEventService) private readonly eventService: IEventService,
    @Inject(IPermissionService) private readonly permissionService: IPermissionService,
    @Inject(ITextsService) private readonly texts: ITextsService,
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
      throw new UnauthorizedException(
        this.texts.getText(
          TEXTS_KEYS.MISSING_ADMIN_OR_SUDO_CREDENTIALS,
        ),
      );
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
      throw new UnauthorizedException(
        this.texts.getText(
          TEXTS_KEYS.MISSING_ADMIN_OR_SUDO_CREDENTIALS,
        ),
      );
    }

    const updatedEvent = await this.eventService.updateEvent(updateEventDto, eventId);
    return {iat: Date.now(), updatedEvent};
  }
}
