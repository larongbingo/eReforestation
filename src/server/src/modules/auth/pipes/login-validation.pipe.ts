import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  UnprocessableEntityException,
} from "@nestjs/common";

import { CredentialsDto } from "../dto/credentials.dto";

@Injectable()
export class LogInValidationPipe implements PipeTransform {
  public transform(value: CredentialsDto, metadata: ArgumentMetadata) {
    if (!value.username || !value.password) {
      throw new UnprocessableEntityException("Empty username/password");
    }
    return value;
  }
}
