import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';

@Injectable()
export class PathUuidValidator implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata) {
    if (!metadata || !value || !isUUID(value, 4)) {
      throw new BadRequestException(
        'Bad request: courseId cannot be empty and it should be a valid uuid',
      );
    }
    return value;
  }
}
