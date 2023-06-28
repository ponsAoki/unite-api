import { createId } from '@paralleldrive/cuid2';

export class UtilServiceMock {
  cuid(): string {
    return createId();
  }
}
