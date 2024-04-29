import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task.model";

@Injectable()
export class StatusValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!this.isStatusValid(value)) {
      throw new BadRequestException('Invalid status');
    }
    return value;
  }

  private isStatusValid(status: any) {
    const idx = Object.values(TaskStatus).indexOf(status);
    return idx !== -1;
  }
}
