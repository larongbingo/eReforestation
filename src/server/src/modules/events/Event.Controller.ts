import { Controller, Post, Put, Get, Inject, Param, Body, UseGuards, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiCreatedResponse, ApiUseTags, ApiUnauthorizedResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";

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

  @ApiUseTags("Public")
  @ApiOperation({title: "Get Events", description: "Gets all of the available events"})
  @ApiOkResponse({description: "The list of events available"})
  @Get()
  public async getEvents() {
    const events = await this.eventService.getEvents();
    return {iat: Date.now(), events};
  }

  @ApiUseTags("Admin")
  @ApiOperation({title: "Create Event", description: "Creates a new event"})
  @ApiCreatedResponse({description: "The details of the newly created event"})
  @ApiUnauthorizedResponse({description: "Your account must have an admin or sudo permission"})
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

  @ApiUseTags("Admin")
  @ApiOperation({title: "Update Event", description: "Updates an event"})
  @ApiCreatedResponse({description: "The details of the newly updated event"})
  @ApiUnauthorizedResponse({description: "Your account must have an admin or sudo permission"})
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
