import { IEvent, EventStatus } from "../../../../../interfaces/models/IEvent";

export class UpdateEventDto {
  public readonly title?: string;
  public readonly location?: string;
  public readonly date?: Date;
  public readonly description?: string;
  public readonly status?: EventStatus;
}
