import { Injectable } from '@nestjs/common';
import { createId } from '@paralleldrive/cuid2';

@Injectable()
export class UtilService {
  cuid(): string {
    return createId();
  }
}
