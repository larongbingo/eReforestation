import { Controller, Post, Put, Get, Inject, Param, Body, UseGuards, UnauthorizedException, UseInterceptors, UploadedFile, BadRequestException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiCreatedResponse, ApiUseTags, ApiUnauthorizedResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";

import { IGalleryService } from "../../../../interfaces/services/IGalleryService";
import { ITextsService } from "../../../../interfaces/services/ITextsService";
import { IPermissionService } from "../../../../interfaces/services/IPermissionService";
import { IEventService } from "../../../../interfaces/services/IEventService";
import { IUser } from "../../../../interfaces/models/IUser";
import { EventStatus } from "../../../../interfaces/models/IEvent";
import { UserEntity } from "../../decorators/User-Entity.Decorator";
import { File } from "../../types";
import { TEXTS_KEYS } from "../texts/Texts.Key";

import { CreateEventDto } from "./dto/CreateEvent.Dto";
import { UpdateEventDto } from "./dto/UpdateEvent.Dto";

// TODO: Too many injects; move permission to EventService
@Controller("/event")
export class EventController {
  constructor(
    @Inject(IEventService) private readonly eventService: IEventService,
    @Inject(IPermissionService) private readonly permissionService: IPermissionService,
    @Inject(ITextsService) private readonly texts: ITextsService,
    @Inject(IGalleryService) private readonly galleryService: IGalleryService,
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
  @UseInterceptors(FileInterceptor("featureImage"))
  @UseGuards(AuthGuard("bearer"))
  public async createEvent(
    @Body() createEventDto: CreateEventDto,
    @UserEntity() user: IUser,
    @UploadedFile() featureImage: File,
  ) {
    if (!await this.permissionService.isUserAdminOrSuperUser(user.id)) {
      throw new UnauthorizedException(
        this.texts.getText(
          TEXTS_KEYS.MISSING_ADMIN_OR_SUDO_CREDENTIALS,
        ),
      );
    }

    if (!featureImage) {
      throw new BadRequestException();
    }

    const fileName = await this.galleryService.storeImage(featureImage.buffer, featureImage.originalname);
    const details = {...createEventDto, status: EventStatus.Go, featureImage: fileName};
    const newEvent = await this.eventService.createEvent(details);
    return {iat: Date.now(), newEvent};
  }

  @ApiUseTags("Admin")
  @ApiOperation({title: "Update Event", description: "Updates an event"})
  @ApiCreatedResponse({description: "The details of the newly updated event"})
  @ApiUnauthorizedResponse({description: "Your account must have an admin or sudo permission"})
  @Put("/:id")
  @UseInterceptors(FileInterceptor("featureImage"))
  @UseGuards(AuthGuard("bearer"))
  public async updateEvent(
    @Param("id") eventId: string,
    @Body() updateEventDto: UpdateEventDto,
    @UploadedFile() featureImage: File,
    @UserEntity() user: IUser,
  ) {
    if (!await this.permissionService.isUserAdminOrSuperUser(user.id)) {
      throw new UnauthorizedException(
        this.texts.getText(
          TEXTS_KEYS.MISSING_ADMIN_OR_SUDO_CREDENTIALS,
        ),
      );
    }

    if (!featureImage) {
      throw new BadRequestException();
    }

    const fileName = await this.galleryService.storeImage(featureImage.buffer, featureImage.originalname);
    const details = {...updateEventDto, fileName, featureImage: fileName};
    const updatedEvent = await this.eventService.updateEvent(details, eventId);
    return {iat: Date.now(), updatedEvent};
  }
}
